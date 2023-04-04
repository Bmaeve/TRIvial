<template>
    <div id="com_scen1">
        <span>Scenario 1</span>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked
                value="faible">
            <label class="form-check-label " for="flexRadioDefault1">
                Faible
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="moyen">
            <label class="form-check-label" for="flexRadioDefault2">
                Moyen
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="fort">
            <label class="form-check-label" for="flexRadioDefault3">
                Fort
            </label>
        </div>
    </div>
    <div id="com_scen2">
        <span>Scenario 2</span>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault4"
                value="faible" checked>
            <label class="form-check-label" for="flexRadioDefault4">
                Faible
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault5"
                value="moyen">
            <label class="form-check-label" for="flexRadioDefault5">
                Moyen
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault6" value="fort">
            <label class="form-check-label" for="flexRadioDefault6">
                Fort
            </label>
        </div>
    </div>
    <div id="com_box">
        <div id="com_Itowns1" class="com_itown">

        </div>
        <div id="com_Itowns2" class="com_itown"></div>
    </div>
    <div id="com_footer">
        <img src="../../assets/logo.png" width="60" height="60" />
    </div>
</template>
<script>
import * as itowns from "../../../node_modules/itowns/dist/itowns";
import itownApi from './api2ITwithColor'

//iTowns Widgets 
//import { Navigation } from "../../../node_modules/itowns/dist/itowns_widgets";
import '../../css/widgets.css';
import $ from 'jquery'



export default {
    name: 'ComparaisonTRIvial',
    props: {

    },
    data() {
        return {
            layerlist: []
        }
    },
    computed: {

    },
    methods: {


    },
    mounted() {


        let layerlist = fetch('http://localhost:3000/dbInfo/getTables').then(res => res.json())

        // Define the view geographic extent
        itowns.proj4.defs(
            'EPSG:2154',
            '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        );
        //Center the view on Paris
        const placement = {
            coord: new itowns.Coordinates("EPSG:4326", 2.340, 48.858),
            range: 20000
        };

        // `viewerDiv` will contain iTowns' rendering area (`<canvas>`)
        var viewerDiv = document.getElementById('com_Itowns1');
        var planarDiv = document.getElementById('com_Itowns2');

        // Instanciate iTowns GlobeView*
        var view = new itowns.GlobeView(viewerDiv, placement);
        var planarView = new itowns.GlobeView(planarDiv, placement);



        /*new itowns.Navigation(view, {
            position: 'bottom-left',
            translate: { y: 75 },
        });
        new itowns.Navigation(planarView, {
            position: 'bottom-right',
            translate: { y: 75 },
        });*/


        var promises = [];
        //var menuGlobe = new GuiTools('menuDiv', view);
        var overGlobe = true;

        viewerDiv.addEventListener('mousemove', function _() {
            overGlobe = true;
        }, false);

        planarDiv.addEventListener('mousemove', function _() {
            overGlobe = false;
        }, false);
        // Ortho wmts config
        var orthoScene1 = require('./Ortho.json')

        orthoScene1.source = new itowns.WMTSSource(orthoScene1.source);

        var layer = new itowns.ColorLayer(orthoScene1.id, orthoScene1);
        view.addLayer(layer);

        // Define the source of the dem data
        /* var elevationSource = new itowns.WMTSSource({
             url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
             crs: 'EPSG:4326',
             name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
             tileMatrixSet: 'WGS84G',
             format: 'image/x-bil;bits=32',
             zoom: { min: 3, max: 10 }
         });
         // Create the dem ElevationLayer and add it to the view
         const layerDEM = new itowns.ElevationLayer('DEM', { source: elevationSource });
 
         view.addLayer(layerDEM)*/

        layerlist.then(data => {
            const spatialLayer = data.filter(el => { return el != 'login' && el != 'view_save' })
            const polyLayer = spatialLayer.filter(el => { return el != 'trans_l' })
            //const lineLayer = spatialLayer.filter(el => { return el == 'trans_l' })
            const scenario = polyLayer.filter(el => { return el == 'scenarios' })
            const admin = polyLayer.filter(el => { return el == 'arrond' || el == 'comm' })
            const batis = polyLayer.filter(el => { return el != 'scenarios' && el != 'arrond' && el != 'comm' && el != 'trans_l_flat' && el != 'trans_l_round' })
            const transport = polyLayer.filter(el => { return el == 'trans_l_flat' })
            console.log(scenario, batis, admin, transport)

            batis.forEach((layer, index) => {
                console.log(layer, index)
                //const colors = ['#6465A5', '#6975A6', '#F3E96B', '#F28A30', '#F05837', '#9EF1EE', '#B1F4F1', '#C1F6F4', '#CDF8F6', '#D7F9F8', '#DFFAF9', '#E5FBFA', '#EAFCFB']
                itownApi.addLayerToView(view, layer, {}, '#BBFFBB')
            })

            transport.forEach(layer => {
                console.log(layer)
                itownApi.addLayerToView(view, layer, {}, '#BBFFBB')
            })


        })

        $('.scen1').change((e) => {
            const value = e.target.value
            console.log(value)
        })
        /*function setExtrusion(properties) {
            return properties.HAUTEUR;
        }*/
        /*function setColor() {
            return new itowns.THREE.Color(0xff0000);
        }*/

        // Listen for globe full initialisation event
        view
            .addEventListener(itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED,
                function globeInitialized() {
                    // eslint-disable-next-line no-console
                    console.info('Globe initialized');
                    Promise.all(promises).then(function init() {
                        var planarCamera = planarView.camera.camera3D;
                        var globeCamera = view.camera.camera3D;
                        var params;

                        function sync() {
                            if (overGlobe) {
                                params = itowns.CameraUtils
                                    .getTransformCameraLookingAtTarget(
                                        view, globeCamera);
                                itowns.CameraUtils
                                    .transformCameraToLookAtTarget(
                                        planarView, planarCamera, params);

                            } else {
                                params = itowns.CameraUtils
                                    .getTransformCameraLookingAtTarget(
                                        planarView, planarCamera);
                                itowns.CameraUtils
                                    .transformCameraToLookAtTarget(
                                        view, globeCamera, params);
                            }
                        }
                        sync();
                        view
                            .addFrameRequester(itowns
                                .MAIN_LOOP_EVENTS.AFTER_CAMERA_UPDATE, sync);
                        planarView
                            .addFrameRequester(itowns
                                .MAIN_LOOP_EVENTS.AFTER_CAMERA_UPDATE, sync);
                    }).catch(console.error);
                });


        var orthoScene2 = require('./Ortho.json')
        var wmsImageryLayer = new itowns.ColorLayer(orthoScene2.id, orthoScene2);
        planarView.addLayer(wmsImageryLayer);

        // Define the source of the dem data
        /* var elevationSource2 = new itowns.WMTSSource({
             url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
             crs: 'EPSG:4326',
             name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
             tileMatrixSet: 'WGS84G',
             format: 'image/x-bil;bits=32',
             zoom: { min: 3, max: 10 }
         });
         // Create the dem ElevationLayer and add it to the view
         const layerDEM2 = new itowns.ElevationLayer('DEM', { source: elevationSource2 });
 
         planarView.addLayer(layerDEM2)*/

        layerlist.then(data => {
            const spatialLayer = data.filter(el => { return el != 'login' && el != 'view_save' })
            const polyLayer = spatialLayer.filter(el => { return el != 'trans_l' })
            //const lineLayer = spatialLayer.filter(el => { return el == 'trans_l' })
            const scenario = polyLayer.filter(el => { return el == 'scenarios' })
            const admin = polyLayer.filter(el => { return el == 'arrond' || el == 'comm' })
            const batis = polyLayer.filter(el => { return el != 'scenarios' && el != 'arrond' && el != 'comm' && el != 'trans_l_flat' && el != 'trans_l_round' })
            const transport = polyLayer.filter(el => { return el == 'trans_l_flat' })
            console.log(scenario, batis, admin, transport)

            batis.forEach((layer, index) => {
                console.log(layer, index)
                //const colors = ['#6465A5', '#6975A6', '#F3E96B', '#F28A30', '#F05837', '#9EF1EE', '#B1F4F1', '#C1F6F4', '#CDF8F6', '#D7F9F8', '#DFFAF9', '#E5FBFA', '#EAFCFB']
                itownApi.addLayerToView(planarView, layer, {}, '#BBFFBB')
            })
            transport.forEach(layer => {
                console.log(layer)
                itownApi.addLayerToView(planarView, layer, {}, '#BBFFBB')
            })

        })





        $('.scen2').change((e) => {
            const value = e.target.value
            console.log(value)
        })

    }
}



</script>
<style>
#com_box {
    margin: 0;
    overflow: hidden;
    height: 90vh;
}

#com_Itowns1 {
    position: absolute;
    left: 0%;
    width: 50%;
    height: 90vh;

}

#com_Itowns2 {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 90vh;
    border-left: 5px solid black;

}

#menuDiv {
    position: absolute;
    left: 10px;
    top: 0px;
    z-index: 0;
}

#menuDiv,
.ac {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 2 !important;
    /* TODO Solve this in HTML, Problem from copy from main.css examples THREE */
}

#com_footer {
    width: 100%;
    height: 10vh;
    background-color: black;
}

#com_footer img {
    position: absolute;
    right: 10px;
    bottom: 5px;
}

#com_scen1 {
    background-color: black;
    opacity: 0.8;
    position: absolute;
    left: 2%;
    top: 5vh;
    width: 10%;
    height: 15vh;
    z-index: 100;
    color: white;
    padding-left: 10px;
}

#com_scen2 {
    background-color: black;
    opacity: 0.8;
    position: absolute;
    right: 2%;
    top: 5vh;
    width: 10%;
    height: 15vh;
    z-index: 100;
    color: white;
    padding-left: 10px;
}
</style>