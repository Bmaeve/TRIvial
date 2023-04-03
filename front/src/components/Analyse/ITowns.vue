<template>
  <div id="an_panel" class="col-auto  bg-dark">
    <div id="an_selection">
      <div id="col_select">

        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh">
          <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">TRIvial - Analyse</span>
          </a>
          <Filter />

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
import { FileSource, THREE, Style, proj4, FeatureGeometryLayer, Coordinates, GlobeView, WMTSSource, ColorLayer, ElevationLayer, } from "../../../node_modules/itowns/dist/itowns";
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
      componentKey: ref(0)
    }
  },
  methods: {
    changefeatureInfo(data) {
      this.store.featureInfo = data
    },
    forceRerender() {
      this.componentKey += 1;
    }
  },
  computed: {
    featureInfo() {
      return this.store.featureInfo
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
      coord: new Coordinates("EPSG:4326", 2.340, 48.858),
      range: 20000
    };
    // Create the globe  view
    const view = new GlobeView(viewerDiv, placement);
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

    // Define the source of the dem data
    var elevationSource = new WMTSSource({
      url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
      crs: 'EPSG:4326',
      name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
      tileMatrixSet: 'WGS84G',
      format: 'image/x-bil;bits=32',
      zoom: { min: 3, max: 10 }
    });
    // Create the dem ElevationLayer and add it to the view
    const layerDEM = new ElevationLayer('DEM', { source: elevationSource });
    view.addLayer(layerDEM);

    // Static Json solution

    function setExtrusion(properties) {
      return properties.HAUTEUR;
    }
    function setColor() {
      return new THREE.Color(0xff0000);
    }
    const batsource = new FileSource({
      url: "http://localhost:3000/",
      crs: 'EPSG:2154',
      format: 'application/json',
    });

    let basic = new FeatureGeometryLayer('basic', {
      // Use a FileSource to load a single file once
      source: batsource,
      transparent: true,
      opacity: 0.7,
      //zoom: { min: 10 },
      style: new Style({
        fill: {
          color: setColor,
          base_altitude: 28,
          extrusion_height: setExtrusion,
        }
      })
    });
    view.addLayer(basic);

    let paramsScen = { "scenario": { "values": ["04Fai"] } }
    api2itowns.addLayerToView(view, "scenarios", paramsScen);

    let params = {
      patrim: {
        filters: ["Chapelle", "Arc de triomphe", "Culte catholique ou orthodoxe"],
        color: new THREE.Color(0xffffff)
      },
      san: {
        filters: ["Maison de retraite", "Hôpital"]
      }
    }
    api2itowns.addEnjeuxToView(view, params);

  }
}
</script>


<style >
#an_itowns_container {
  width: 75%;
  height: 90vh;
  overflow: auto;
}

#viewerDiv {
  margin: auto;
  height: 100vh;
  width: 100%;
  padding: 0;
}

#an_panel {
  padding: 15px;
}
</style>
