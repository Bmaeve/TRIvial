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


        // itowns.proj4.defs('EPSG:3946', '+proj=lcc +lat_1=45.25 +lat_2=46.75 +lat_0=46 +lon_0=3 +x_0=1700000 +y_0=5200000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

        /*const placement = {
            coord: new itowns.Coordinates("EPSG:3946", 1651269, 5519421),
            range: 20000
        };*/
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

        // Define the source of the dem data
        var elevationSource = new itowns.WMTSSource({
            url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
            crs: 'EPSG:4326',
            name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
            tileMatrixSet: 'WGS84G',
            format: 'image/x-bil;bits=32',
            zoom: { min: 3, max: 10 }
        });
        // Create the dem ElevationLayer and add it to the view
        const layerDEM = new itowns.ElevationLayer('DEM', { source: elevationSource });

        view.addLayer(layerDEM)
        // Static Json solution

        function setExtrusion(properties) {
            return properties.HAUTEUR;
        }
        function setColor() {
            return new itowns.THREE.Color(0xff0000);
        }
        const batsource = new itowns.FileSource({
            url: "http://localhost:3000/",
            crs: 'EPSG:2154',
            format: 'application/json',
        });

        let basic = new itowns.FeatureGeometryLayer('basic', {
            // Use a FileSource to load a single file once
            source: batsource,
            transparent: true,
            opacity: 0.7,
            //zoom: { min: 10 },
            style: new itowns.Style({
                fill: {
                    color: setColor,
                    base_altitude: 28,
                    extrusion_height: setExtrusion,
                }
            })
        });


        view.addLayer(basic);
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

        /*new itowns.Navigation(view, {
                    position: 'bottom-left',
                    translate: { y: 75 },
                });*/
        var json2 = require('./Ortho.json')
        var wmsImageryLayer = new itowns.ColorLayer(json2.id, json2);
        planarView.addLayer(wmsImageryLayer);

        // Define the source of the dem data
        var elevationSource2 = new itowns.WMTSSource({
            url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wmts',
            crs: 'EPSG:4326',
            name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3',
            tileMatrixSet: 'WGS84G',
            format: 'image/x-bil;bits=32',
            zoom: { min: 3, max: 10 }
        });
        // Create the dem ElevationLayer and add it to the view
        const layerDEM2 = new itowns.ElevationLayer('DEM', { source: elevationSource2 });

        planarView.addLayer(layerDEM2)
        // Api rest solution  

        fetch('http://localhost:3000/getBatis').then(res => res.json()).then(data => {

            function setExtrusions(properties) {
                return properties.hauteur;
            }

            let marne = new itowns.FeatureGeometryLayer('Marne', {
                // Use a FileSource to load a single file once
                source: new itowns.FileSource({
                    fetchedData: data,
                    crs: 'EPSG:2154',
                    format: 'application/json',
                }),
                transparent: true,
                opacity: 0.7,
                style: new itowns.Style({
                    fill: {
                        color: new itowns.THREE.Color(0xbbffbb),
                        base_altitude: 28,
                        extrusion_height: setExtrusions,
                    }
                })

            });
            planarView.addLayer(marne);
        })
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