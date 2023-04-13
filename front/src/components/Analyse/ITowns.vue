<template>
  <div id="an_panel" class="col-auto  bg-dark">
    <div id="an_selection">
      <div id="col_select">

        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh">
          <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">TRIvial - Analyse</span>
          </a>
          <Filter @scenarioChanged="onScenarioChanged" @validate="onValidate" v-bind:buttonDisable="buttonDisable" />

        </div>

      </div>
    </div>
    <!-- Feature information block -->
    <div class="an_info_enjeux" id="displayInfo">
      <span>Informations</span>
      <!-- Feature information table block -->
      <div class="an_info_enjeux_table" id="info">
        <!-- Feature information table -->
      </div>
    </div>
  </div>
  <div id="an_map">

    <div id="viewerDiv">
    </div>
  </div>
</template>

<script>

import { proj4, Coordinates, GlobeView, WMTSSource, ColorLayer, ElevationLayer } from "../../../node_modules/itowns/dist/itowns";

//iTowns Widgets 
import { Navigation } from "../../../node_modules/itowns/dist/itowns_widgets";
import '../../css/widgets.css';
import api2itowns from '../../js/api2itowns'
import Filter from '@/components/Analyse/Filter.vue'
//import the store
import { store } from '../Store.js'

//import the vuejs Dom reference function
import { isProxy, toRaw } from 'vue';

export default {
  name: 'MyItowns',
  components: {
    Filter
  },
  data() {
    return {
      store,
      view: null,
      buttonDisable: false,
      current_scenario: "01For",
      scenarioId: 0
    }
  },
  methods: {
    onScenarioChanged(value) {
      this.scenarioId = value;
    },
    onValidate(params) {
      let promises = []

      let view = this.view;
      if (isProxy(view)) {
        view = toRaw(view);
      }

      let enjeuxPromise = api2itowns.addEnjeuxToView(view, params);
      promises.push(enjeuxPromise);

      if (this.current_scenario != this.getScenarioId) {
        try {
          view.removeLayer("scenarios");
        } catch (e) {
          //pass
        }
        let scenarioParams = { filters: [this.getScenarioId], columnFiltered: "scenario", color: 'red' };
        let scenarioPromise = api2itowns.addLayerToView(view, "scenarios", scenarioParams);
        promises.push(scenarioPromise);
        this.current_scenario = this.getScenarioId;
      }

      this.buttonDisable = true
      Promise.all(promises)
        .then(() => {
          this.buttonDisable = false
        })
    }
  },
  computed: {
    getScenarioId() {
      return this.scenarioId;
    }
  },
  mounted() {
    // Retrieve the view container
    const viewerDiv = document.getElementById('viewerDiv');

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

    view.addLayer(layerOrtho)
    let IGN_MNT = require('../DEMConfig/IGN_MNT_HIGHRES.json')
    let WORLD_DTM = require('../DEMConfig/WORLD_DTM.json')

    console.log(IGN_MNT, WORLD_DTM)

    // defined in a json file.
    function addElevationLayerFromConfig(config) {
      config.source = new WMTSSource(config.source);
      view.addLayer(
        new ElevationLayer(config.id, config),
      );
    }
    addElevationLayerFromConfig(IGN_MNT);
    addElevationLayerFromConfig(WORLD_DTM);
    // // Define the source of the dem data
    /*var elevationSource = new WMTSSource({
      url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
      crs: 'EPSG:4326',
      name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
      tileMatrixSet: 'WGS84G',
      format: 'image/x-bil;bits=32',
      zoom: { min: 3, max: 10 }
    });
    // // Create the dem ElevationLayer and add it to the view
    const layerDEM = new ElevationLayer('DEM', { source: elevationSource });
    view.addLayer(layerDEM);*/


    let scenarioParams = { filters: [this.current_scenario], columnFiltered: "scenario", color: 'red' };
    api2itowns.addLayerToView(view, "scenarios", scenarioParams);


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

/* Feature information block */
.an_info_enjeux {
  color: white !important;
  width: 100%;
  margin-top: 15%;
}

/* Feature information table */
.an_table_info {
  background-color: white;
}

/* Feature information table block*/
.an_info_enjeux_table {
  overflow-y: auto;
  height: 40vh;
}

.an_select_form {
  height: 50vh;
  overflow-y: auto;
}
</style>
