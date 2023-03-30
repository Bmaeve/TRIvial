<template>
    <div id="com_box">
        <div id="com_Itowns1" class="com_itown"></div>
        <div id="com_Itowns2" class="com_itown"></div>
    </div>
</template>
<script>
import * as itowns from "../../../node_modules/itowns/dist/itowns";

//iTowns Widgets 
//import { Navigation } from "../../../node_modules/itowns/dist/itowns_widgets";
import '../../css/widgets.css';

export default {
    name: 'ComparaisonTRIvial',
    props: {

    },
    mounted() {

        // Define crs projection that we will use (taken from https://epsg.io/3946, Proj4js section)
        /*itowns.proj4.defs(
            'EPSG:2154',
            '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        );*/

        itowns.proj4.defs('EPSG:3946', '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
        /*itowns.proj4.defs(
            'EPSG:2154',
            '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        );*/
        var placement = {
            coord: new itowns.Coordinates('EPSG:4326', 4.838, 45.756),
            range: 1000,
        }
        var extent = new itowns.Extent(
            'EPSG:3946',
            1837816.94334, 1847692.32501,
            5170036.4587, 5178412.82698);
        /*var extent = new itowns.Extent(
            'EPSG:2154',
            -378305.81, 6005281.2,
            1320649.57, 7235612.72);*/

        // `viewerDiv` will contain iTowns' rendering area (`<canvas>`)
        var viewerDiv = document.getElementById('com_Itowns1');
        var planarDiv = document.getElementById('com_Itowns2');

        // Instanciate iTowns GlobeView*
        var view = new itowns.GlobeView(viewerDiv, placement);
        var planarView = new itowns.PlanarView(planarDiv, extent, { placement });

        /* new itowns.Navigation(planarView, {
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
        var json = require('./Ortho.json')

        json.source = new itowns.WMTSSource(json.source);

        var layer = new itowns.ColorLayer(json.id, json);
        view.addLayer(layer);


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
                        // menuGlobe.addImageryLayersGUI(view.getLayers(function filterColor(l) { return l.isColorLayer; }));
                        //menuGlobe.addElevationLayersGUI(view.getLayers(function filterElevation(l) { return l.isElevationLayer; }));

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

        var wmsImagerySource = new itowns.WMSSource({
            extent: extent,
            name: 'Ortho2009_vue_ensemble_16cm_CC46',
            url: 'https://download.data.grandlyon.com/wms/grandlyon',
            version: '1.3.0',
            crs: 'EPSG:3946',
            format: 'image/jpeg',
        });
        /*var orthoSource = new itowns.WMTSSource({
            extent: extent,
            url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
            crs: 'EPSG:3857',
            name: 'ORTHOIMAGERY.ORTHOPHOTOS',
            tileMatrixSet: 'PM',
            format: 'image/jpeg',
        });*/
        var wmsImageryLayer = new itowns.ColorLayer('wms_imagery', {
            updateStrategy: {
                type: itowns.STRATEGY_DICHOTOMY,
                options: {},
            },
            source: wmsImagerySource,
        });
        planarView.addLayer(wmsImageryLayer);
        //var d = new debug.Debug(view, menuGlobe.gui);
        //debug.createTileDebugUI(menuGlobe.gui, view, view.tileLayer, d);
    }
}



</script>
<style>
#com_box {
    margin: 0;
    overflow: hidden;
    height: 100%;
}

#com_Itowns1 {
    position: absolute;
    left: 0%;
    width: 50%;
    height: 100%;

}

#com_Itowns2 {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 100%;

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
</style>