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
import { proj4, Coordinates, GlobeView, WMTSSource, ColorLayer, ElevationLayer } from "../../../node_modules/itowns/dist/itowns";

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
import { THREE } from '../../../node_modules/itowns/dist/itowns';

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
    view.addLayer(layerOrtho);

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

    // EXAMPLE
    let scenario = "04Fai"
    let paramsScen = { filters: [scenario], columnFiltered: "scenario" };
    api2itowns.addLayerToView(view, "scenarios", paramsScen);

    let params = {
      patrim: {
        color: 'white',
        concernedByScenario: scenario
      },
      san: {
        filters: ["Maison de retraite", "Hôpital"],
        color: 'orange',
        concernedByScenario: scenario
      }
    }
    api2itowns.addEnjeuxToView(view, params)

    let bouton_valider = document.getElementById('validate');
    bouton_valider.addEventListener('click', () => {
      let params = JSON.parse(JSON.stringify(this.store.params));
      api2itowns.addEnjeuxToView(view, params);
    });

    //console.log(view.tileLayer.attachedLayers.getElementById("scenarios"));
    mouseOver(view, view.getLayers()[1]);
  }
}

function mouseOver(view, layer) {
  // add an event for picking the 3D Tiles layer and displaying information about the picked feature in an html div
  var pickingArgs = {};
  pickingArgs.htmlDiv = document.getElementById('displayInfo');
  pickingArgs.view = view;
  pickingArgs.layer = layer;
  window.addEventListener('mousemove', (event) => {
    console.log(" - MouseMove - ");
    view.tileLayer.attachedLayers.forEach(layer => {
      if (layer.transparent) {
        pickingArgs.layer = layer;
      }
    })
    fillHTMLWithPickingInfo(event, pickingArgs);
  }, false);
}

// Function allowing picking on a given 3D tiles layer and filling an html div with information on the picked feature
// Expected arguments:
// pickingArg.htmlDiv (div element which contains the picked information)
// pickingArg.view : iTowns view where the picking must be done
// pickingArg.layer : the layer on which the picking must be done
// eslint-disable-next-line
function fillHTMLWithPickingInfo(event, pickingArg) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  console.log("Affichage - pickingArg :");
  console.log(pickingArg.layer);
  if (pickingArg.layer.object3d != undefined && !pickingArg.layer.object3d.isObject3D) {
    console.warn('Function fillHTMLWithPickingInfo only works' + ' for C3DTilesLayer layers.');
    return;
  }
  console.log(pickingArg.htmlDiv);
  console.log(pickingArg.htmlDiv.firstChild);

  // Remove content already in html div
  while (pickingArg.htmlDiv.firstChild) {
    pickingArg.htmlDiv.removeChild(pickingArg.htmlDiv.firstChild);
  }

  // Get intersected objects 
  //var intersects = pickingArg.view.pickObjectsAt(event, 5, pickingArg.layer);
  const intersects = raycaster.intersectObjects(scene.children);
  console.log("intersects");
  console.log(pickingArg.layer);
  console.log(intersects);
  if (intersects.length === 1) {
    console.log("OUAIIII");
    console.log(intersects);
  }
  if (intersects.length === 0) { return; }

  // Get information from intersected objects (from the batch table and eventually the 3D Tiles extensions
  var featureDisplayableInfo = pickingArg.layer.getInfoFromIntersectObject(intersects);
  console.log("454554");
  console.log(featureDisplayableInfo);
  if (featureDisplayableInfo) {
    // eslint-disable-next-line
    pickingArg.htmlDiv.appendChild(createHTMLListFromObject(featureDisplayableInfo));
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
