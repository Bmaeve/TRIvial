<template>
  <div id="an_panel" class="col-auto  bg-dark">
    <div id="an_selection">
      <div id="col_select">

        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh">
          <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">TRIvial - Analyse</span>
          </a>
          <Filter @scenarioChanged="onScenarioChanged" />

        </div>

      </div>
    </div>
    <SectionInfo :featureInfoData="featureInfo" :key="componentKey" />
  </div>
  <div id="an_map">

    <div id="viewerDiv">
    </div>
  </div>
</template>

<script>
import { proj4, Coordinates, GlobeView, WMTSSource, ColorLayer } from "../../../node_modules/itowns/dist/itowns";
//iTowns Widgets 
import { Navigation } from "../../../node_modules/itowns/dist/itowns_widgets";
import '../../css/widgets.css';
import api2itowns from '../../js/api2itowns'
import SectionInfo from '@/components/Analyse/Selection.vue'
import Filter from '@/components/Analyse/Filter.vue'
//import jquery module
import $ from 'jquery'
//import the store
import { store } from '../Store.js'
//import the vuejs Dom reference function
import { ref } from 'vue';
export default {
  name: 'MyItowns',
  components: {
    SectionInfo,
    Filter
  },
  data() {
    return {
      store,
      componentKey: ref(0),
      scenarioId: 0
    }
  },
  methods: {
    changefeatureInfo(data) {
      this.store.featureInfo = data
    },
    forceRerender() {
      this.componentKey += 1;
    },
    onScenarioChanged(value) {
      this.scenarioId = value;
    }
  },
  computed: {
    featureInfo() {
      return this.store.featureInfo
    },
    getScenarioId() {
      return this.scenarioId;
    }
  },
  mounted() {
    // Retrieve the view container
    const viewerDiv = document.getElementById('viewerDiv');

    $('#viewerDiv').click(() => {
      const newfeature = [{
        "id": this.store.featureInfo[0].id ? this.store.featureInfo[0].id += 1 : 1,
        "titre": "Avenue",
        "taille": 20,
        "RN": "A231",
        "Nombre": 4543,
        "enabled": true,
        "Superficie": "A231",
        "Capatite": 4543,
        "vul": true
      }]

      this.changefeatureInfo(newfeature)
      this.forceRerender()

    })
    // Define the view geographic extent
    proj4.defs(
      'EPSG:2154',
      '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );
    //Center the view on Paris
    const placement = {
      coord: new Coordinates("EPSG:4326", 2.352462566790728, 48.857905124448),
      range: 20000
    };
    // Create the globe  view
    let view = new GlobeView(viewerDiv, placement);

    //Adding navigation controls
    new Navigation(view, {
      position: 'bottom-right',
      translate: { y: 0 },
    });



    // Define the source of the ortho-images
    var orthoSource = new WMTSSource({
      url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
      crs: 'EPSG:3857',
      name: 'ORTHOIMAGERY.ORTHOPHOTOS',
      tileMatrixSet: 'PM',
      format: 'image/jpeg',
    });
    // Create the ortho-images ColorLayer and add it to the view
    const layerOrtho = new ColorLayer('Ortho', { source: orthoSource });
    view.addLayer(layerOrtho)

    // // Define the source of the dem data
    /* var elevationSource = new WMTSSource({
      url: 'https://elevation.nationalmap.gov/arcgis/rest/services/3DEPElevation/ImageServer',
      crs: 'EPSG:4326',
      name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
      tileMatrixSet: 'WGS84G',
      format: 'image/x-bil;bits=32',
      zoom: { min: 3, max: 10 }
    });
    // // Create the dem ElevationLayer and add it to the view
    const layerDEM = new ElevationLayer('DEM', { source: elevationSource });
    view.addLayer(layerDEM);*/

    let current_scenario = "01For"
    let scenarioParams = { filters: [current_scenario], columnFiltered: "scenario", color: 'red' };
    api2itowns.addLayerToView(view, "scenarios", scenarioParams);

    document.getElementById('validate').addEventListener('click', () => {
      let params = JSON.parse(JSON.stringify(this.store.params));
      api2itowns.addEnjeuxToView(view, params);

      if (current_scenario != this.getScenarioId) {
        try {
          view.removeLayer("scenarios");
        } catch (e) {
          //pass
        }
        let scenarioParams = { filters: [this.getScenarioId], columnFiltered: "scenario", color: 'red' };
        api2itowns.addLayerToView(view, "scenarios", scenarioParams);
        current_scenario = this.getScenarioId;
      }
    })


  }
}
</script>


<style >
#viewerDiv {
  height: 100vh;
  width: 100vw;
  padding: 0;
  overflow-x: hidden;
}
</style>
