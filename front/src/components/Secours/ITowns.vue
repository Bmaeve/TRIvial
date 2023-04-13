<template>
  <div id="sec_panel" class="container">
    <!-- Section title -->
    <div class="sec_info_title">
      <h4>TRIvial - Secours</h4>
    </div>
    <viewImport @import="importScenario" />
    <SectionInfo :featureInfoData="featureInfo" :key="componentKey" />
  </div>
  <div id="sec_map">

    <div id="sec_viewerDiv">
    </div>
  </div>
</template>

<script>
import { proj4, Coordinates, GlobeView, WMTSSource, ColorLayer, ElevationLayer } from "../../../node_modules/itowns/dist/itowns";
//iTowns Widgets 
import { Navigation } from "../../../node_modules/itowns/dist/itowns_widgets";
import '../../css/widgets.css';
//import section component
import SectionInfo from '@/components/Secours/Section.vue'
//import decision view component
import viewImport from "@/components/Secours/viewImport.vue";
//import jquery module
import $ from 'jquery'
//import the store
import { store } from '../Store.js'
//import the vuejs Dom reference function
import { ref, isProxy, toRaw } from 'vue';
//import api2itowns
import api2itowns from '../../js/api2itowns'

//Init feature info list

export default {
  name: 'MyItowns',
  components: {
    viewImport,
    SectionInfo
  },
  data() {
    return {
      store,
      view: null,
      scenarioName: null,
      componentKey: ref(0)
    }
  },
  methods: {
    changefeatureInfo(data) {
      this.store.featureInfo = data
    },
    forceRerender() {
      this.componentKey += 1;
    },
    importScenario(scenarioName) {
      fetch('http://localhost:3000/importParams/data', {
        body: JSON.stringify({ texte: "parameters/" + scenarioName }),
        headers: { 'Content-Type': 'application/json' },
        method: 'post'
      }).then(res => res.json()).then(r => {
        let view = this.view;
        if (isProxy(view)) {
          view = toRaw(view);
        }
        api2itowns.addEnjeuxToView(view, r.data[0]);
      })
    }
  },
  computed: {
    featureInfo() {
      return this.store.featureInfo
    }
  },
  mounted() {
    // Retrieve the view container
    const viewerDiv = document.getElementById('sec_viewerDiv');


    $('#sec_viewerDiv').click(() => {
      const newfeature = [{
        "id": this.store.featureInfo[0].id ? this.store.featureInfo[0].id += 1 : 1,
        "titre": "Avenue",
        "taille": 20,
        "RN": "A231",
        "Nombre": 4543,
        "enabled": true
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
      coord: new Coordinates("EPSG:4326", 2.340, 48.858),
      range: 20000
    };

    // Create the globe  view
    const view = new GlobeView(viewerDiv, placement);
    this.view = view;

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
    view.addLayer(layerOrtho);

    // // Define the source of the dem data
    // var elevationSource = new WMTSSource({
    //   url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
    //   crs: 'EPSG:4326',
    //   name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
    //   tileMatrixSet: 'WGS84G',
    //   format: 'image/x-bil;bits=32',
    //   zoom: { min: 3, max: 10 }
    // });
    // // Create the dem ElevationLayer and add it to the view
    // const layerDEM = new ElevationLayer('DEM', { source: elevationSource });
    // view.addLayer(layerDEM);

    // Define the source of the dem data
    let IGN_MNT = require('../DEMConfig/IGN_MNT_HIGHRES.json')
    let WORLD_DTM = require('../DEMConfig/WORLD_DTM.json')

    console.log(IGN_MNT, WORLD_DTM)

    // defined in a json file.
    function addElevationLayerFromConfig(config, name) {
      config.source.name = name
      config.source = new WMTSSource(config.source);
      view.addLayer(
        new ElevationLayer(config.id, config),
      );
    }
    addElevationLayerFromConfig(IGN_MNT, 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES');
    addElevationLayerFromConfig(WORLD_DTM, 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3');

  }

}
</script>


<style scoped>
#sec_panel {
  height: 100vh;

  background-color: black;
  color: white;
}

#sec_viewerDiv {
  margin: auto;
  height: 100vh;
  width: 100%;
  padding: 0;
}

#sec_loading_gif {
  position: absolute;
  left: 52%;
  top: 40vh;
  z-index: 100;
}
</style>
