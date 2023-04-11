<template>
    <div id="com_scen1">
        <span>Scenario 1</span>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="04Fai"
                :disabled="getDisabled1">
            <label class="form-check-label " for="flexRadioDefault1">
                04Fai
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="02Moy"
                :disabled="getDisabled1">
            <label class="form-check-label" for="flexRadioDefault2">
                02Moy
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="01For"
                :disabled="getDisabled1">
            <label class="form-check-label" for="flexRadioDefault3">
                01For
            </label>
        </div>
        <span style="font-size: .7em;">Click map for active</span>
    </div>
    <div id="com_scen2">
        <span>Scenario 2</span>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault4" value="04Fai"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault4">
                04Fai
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault5" value="02Moy"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault5">
                02Moy
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault6" value="01For"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault6">
                01For
            </label>
        </div>
        <span style="font-size: .7em;">Click map for active</span>
    </div>
    <div id="com_box">
        <Scene1 />
        <Scene2 />
    </div>
    <div id="com_fiche1">
        <div class="com_count"><span>bâtiments atteints ({{ getCount1 }})</span></div>
        <table class="table table-dark table-striped">
            <!-- Feature properties table header -->
            <thead>
                <tr>
                    <th scope="col">ID TRI</th>
                    <th scope="col">ID DBTOPO</th>
                    <th scope="col">ENJEU</th>
                    <th scope="col">DETAIL</th>
                    <th scope="col">HAUTEUR</th>
                    <th scope="col">NATURE</th>


                </tr>
            </thead>
            <tbody>
                <!-- Loop for show the properties informations -->
                <template v-for="(properties, key) in getFeatureIntersect" :key='key'>
                    <tr>
                        <th>{{ properties.id_tri }}</th>
                        <td>{{ properties.id_bdtopo }}</td>
                        <td>{{ properties.enjeu }}</td>
                        <td>{{ properties.detail_enj }}</td>
                        <td>{{ properties.hauteur }}</td>
                        <td>{{ properties.nature }}</td>


                    </tr>

                </template>
            </tbody>
        </table>
    </div>
    <div id="com_fiche2">
        <div class="com_count"><span>bâtiments atteints ({{ getCount2 }})</span></div>
        <table class="table table-dark table-striped">

            <!-- Feature properties table header -->
            <thead>
                <tr>
                    <th scope="col">ID TRI</th>
                    <th scope="col">ID DBTOPO</th>
                    <th scope="col">ENJEU</th>
                    <th scope="col">DETAIL</th>
                    <th scope="col">HAUTEUR</th>
                    <th scope="col">NATURE</th>

                </tr>
            </thead>
            <tbody>
                <!-- Loop for show the properties informations -->
                <template v-for="(properties, key) in getFeatureIntersect2" :key='key'>
                    <tr>
                        <th>{{ properties.id_tri }}</th>
                        <td>{{ properties.id_bdtopo }}</td>
                        <td>{{ properties.enjeu }}</td>
                        <td>{{ properties.detail_enj }}</td>
                        <td>{{ properties.hauteur }}</td>
                        <td>{{ properties.nature }}</td>
                    </tr>

                </template>
            </tbody>
        </table>
    </div>
    <div id="com_footer">
        <id id="com_fiche_btn">
            <button type="button" class="btn btn-light">{{ getFicheTitle }}</button>
        </id>
        <div id="com_indic">
            <p>Ctrl + mouse drag for use 3D</p>

        </div>
        <img src="../../assets/logo.png" width="60" height="60" />
        <div id="com_boutonAn"> <a href="/TRIVial"><button type="button" class="btn btn-outline-success  ">
                    MENU</button></a></div>

    </div>

    <button id="com_viewChange" type="button" class="btn btn-dark">{{ getViewType }}</button>
</template>
<script>
import * as itowns from "../../../node_modules/itowns/dist/itowns";
import api2itowns from '../../js/api2itowns'
import Scene1 from '@/components/Comparaisons/Scene1.vue'
import Scene2 from '@/components/Comparaisons/Scene2.vue'
//iTowns Widgets 
//import { Navigation } from "../../../node_modules/itowns/dist/itowns_widgets";
import '../../css/widgets.css';
import $ from 'jquery'

//import the vuejs Dom reference function
import { ref } from 'vue';



export default {
    name: 'ComparaisonTRIvial',
    props: {

    },
    components: {
        Scene1,
        Scene2
    },
    data() {
        return {
            layerlist: [],
            scen1: ["04Fai"],
            scen2: [],
            componentKey: ref(0),
            viewType: "2D",
            fiche: "Voir fiche",
            featuresIntersect: [],
            featuresIntersect2: [],
            disabledScn1: true,
            disabledScn2: true
        }
    },
    computed: {
        getScen1() {
            return this.scen1
        },
        getScen2() {
            return this.scen2
        },
        getViewType() {
            return this.viewType
        },
        getFicheTitle() {
            return this.fiche
        },
        getFeatureIntersect() {
            return this.featuresIntersect
        },
        getFeatureIntersect2() {
            return this.featuresIntersect2
        },
        getCount1() {
            return this.featuresIntersect.length
        },
        getCount2() {
            return this.featuresIntersect2.length
        },
        getDisabled1() {
            return this.disabledScn1
        },
        getDisabled2() {
            return this.disabledScn2
        }
    },
    methods: {
        changeScene1(value) {
            this.scen1 = Object([value])
        },
        changeScene2(value) {
            this.scen2 = Object([value])
        },
        forceRerender() {
            this.componentKey += 1;
        },
        changeViewType() {
            if (this.viewType == "2D") {
                this.viewType = "3D"
            } else {
                this.viewType = "2D"
            }
        },
        changeFicheTitle() {
            if (this.fiche == 'Voir fiche') {
                this.fiche = 'Masquer fiche'
            } else {
                this.fiche = 'Voir fiche'
            }
        },
        changeFtIntersect(data) {
            this.featuresIntersect = data
        },
        changeFtIntersect2(data) {
            this.featuresIntersect2 = data
        },
        changeDisabled1() {
            this.disabledScn1 = !this.disabledScn1
        },
        changeDisabled2() {
            this.disabledScn2 = !this.disabledScn2
        }

    },
    mounted() {

        const fiche1 = $('#com_fiche1')
        const fiche2 = $('#com_fiche2')
        const action = $('#com_fiche_btn')
        fiche1.hide()
        fiche2.hide()

        action.click(() => {
            fiche1.slideToggle('slow')
            fiche2.slideToggle('slow')
            this.changeFicheTitle()
        })

        //let layerlist = fetch('http://localhost:3000/dbInfo/getTables').then(res => res.json())

        // Define the view geographic extent
        itowns.proj4.defs(
            'EPSG:2154',
            '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        );
        //Center the view on Paris
        let placement = {
            coord: new itowns.Coordinates("EPSG:4326", 2.340, 48.858),
            range: 30000,
            tilt: 0,
            heading: 110.9
        };

        // `viewerDiv` will contain iTowns' rendering area (`<canvas>`)
        var viewerDiv = document.getElementById('com_Itowns1');
        var planarDiv = document.getElementById('com_Itowns2');
        $('#com_viewChange').click(() => {
            this.changeViewType()
        })
        // Instanciate iTowns GlobeView*
        var view = new itowns.GlobeView(viewerDiv, placement);
        var planarView = new itowns.GlobeView(planarDiv, placement);


        var promises = [];
        var overGlobe = true;

        setTimeout(() => {

            viewerDiv.addEventListener('mousemove', function _() {
                overGlobe = true;
            }, false);

            planarDiv.addEventListener('mousemove', function _() {
                overGlobe = false;
            }, false);
        }, 5000)

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

        /*let createLayer = (views, layer, color) => {
            fetch('http://localhost:3000/data/' + layer + '/selectData').then(res => res.json()).then(data => {
                function setExtrusions(properties) {
                    return properties.hauteur;
                }
                let marne = new itowns.FeatureGeometryLayer(layer, {
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
                            color: new itowns.THREE.Color(color),
                            base_altitude: 1,
                            extrusion_height: setExtrusions,
                        }
                    })
                });
                views.addLayer(marne);
            })
        }*/

        let createScenarioIntersect = (Scenario, views) => {
            let scenario = Scenario
            let params = {
                patrim: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                san: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                admin: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                autre: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                def: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                ens: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                indus: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                trans_s: {
                    color: 'white',
                    concernedByScenario: scenario
                },
                trans_l_flat_p: {
                    color: 'white',
                    concernedByScenario: scenario
                }
            }

            return api2itowns.addEnjeuxToView(views, params)


        }

        /* layerlist.then(data => {
             const spatialLayer = data.filter(el => { return el != 'login' && el != 'view_save' })
             const polyLayer = spatialLayer.filter(el => { return el != 'trans_l' })
   
             const admin = polyLayer.filter(el => { return el == 'arrond' || el == 'comm' })
             const batis = polyLayer.filter(el => { return el != 'scenarios' && el != 'arrond' && el != 'comm' && el != 'trans_l_flat' && el != 'trans_l_round' })
             const transport = polyLayer.filter(el => { return el == 'trans_l_flat' })
             console.log( batis, admin, transport)
 
             batis.forEach((layer) => { 
                 createLayer(view, layer, '#ffffff')
             })
 
             transport.forEach(layer => {
                 console.log(layer)
 
                 createLayer(view, layer, '#D5CABC')
             })
 
 
         })*/
        let counter = 0
        let counter2 = 0
        let getProxy = (data) => {
            return JSON.parse(JSON.stringify(data))
        }

        $('.scen1').change((e) => {
            $('#com_Itowns1').click()


            const value = e.target.value
            this.changeScene1(value)


            // const enjeuxList = ['admin', 'autre', 'def', 'ens', 'indus', 'patrim', 'san', 'trans_s', 'trans_l_flat_p']

            try {
                /*enjeuxList.forEach(el => {
                    view.removeLayer(el)
                })*/
                view.removeLayer('scenarios')



            } catch (err) {
                console.log(err)
            }

            createScenarioIntersect(this.getScen1[0], view).then(res => {
                const layers = view.getLayers()
                console.log(res)
                const featuresIntersectList = []
                layers.forEach((el, index) => {
                    const lastindex = el.id.split('_').length - 1
                    if (index > 2 && el.id.split('_')[lastindex] == (counter + counter2).toString() && el.id != 'trans_l_flat_p' + '_' + (counter + counter2).toString()) {
                        const featuresInt = el.source.fetchedData.features.filter(el => { return el.properties['intersectwith_scenarios_' + this.getScen1[0].toLowerCase()] === true })
                        featuresInt.forEach(ft => {
                            featuresIntersectList.push(ft.properties)
                        })
                    }

                })
                this.changeFtIntersect(featuresIntersectList)

                counter++


            })


            const paramsScentest = { filters: getProxy(this.getScen1), columnFiltered: "scenario" };
            api2itowns.addLayerToView(view, "scenarios", paramsScentest);

        })

        // Listen for globe full initialisation event
        const time = 5000;
        const pathTravel = [];
        pathTravel.push({ coord: new itowns.Coordinates('EPSG:4326', 2.340, 48.858), range: 20000, time: time * 0.4 });
        //pathTravel.push({ range: 10000, time: time * 0.2, tilt: 0, heading: 110.9 });
        pathTravel.push({ tilt: 15, time: time * 0.6 });

        const Travel2D = [];
        Travel2D.push({ tilt: 90, time: time * 0.6 });

        const Travel3D = [];
        Travel3D.push({ tilt: 15, time: time * 0.6 });

        function travel(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, pathTravel);
        }


        function travel2d(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, Travel2D);
        }


        function travel3d(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, Travel3D);
        }



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


        /*layerlist.then(data => {
            const spatialLayer = data.filter(el => { return el != 'login' && el != 'view_save' })
            const polyLayer = spatialLayer.filter(el => { return el != 'trans_l' })

            const admin = polyLayer.filter(el => { return el == 'arrond' || el == 'comm' })
            const batis = polyLayer.filter(el => { return el != 'scenarios' && el != 'arrond' && el != 'comm' && el != 'trans_l_flat' && el != 'trans_l_round' })
            const transport = polyLayer.filter(el => { return el == 'trans_l_flat' })
            console.log(batis, admin, transport)

            batis.forEach((layer) => {
                createLayer(planarView, layer, '#ffffff')
            })

            transport.forEach(layer => {
                createLayer(planarView, layer, '#D5CABC')

            })

        })*/
        //createScenarioIntersect(this.getScen2[0], planarView)

        $('.scen2').change((e) => {
            $('#com_Itowns2').click()
            const value = e.target.value
            this.changeScene2(value)
            try {
                planarView.removeLayer('scenarios')
            } catch (err) {
                console.log(err)
            }
            createScenarioIntersect(this.getScen2[0], planarView).then(res => {
                const layers = planarView.getLayers()
                console.log(res)
                const featuresIntersectList2 = []
                layers.forEach((el, index) => {
                    const lastindex = el.id.split('_').length - 1
                    if (index > 2 && el.id.split('_')[lastindex] == (counter + counter2).toString() && el.id != 'trans_l_flat_p' + '_' + (counter + counter2).toString()) {
                        const featuresInt = el.source.fetchedData.features.filter(el => { return el.properties['intersectwith_scenarios_' + this.getScen2[0].toLowerCase()] === true })
                        featuresInt.forEach(ft => {
                            featuresIntersectList2.push(ft.properties)
                        })
                    }

                })
                this.changeFtIntersect2(featuresIntersectList2)
                counter2++

            })
            const paramsScentest = { filters: getProxy(this.getScen2), columnFiltered: "scenario" };
            api2itowns.addLayerToView(planarView, "scenarios", paramsScentest);
        })

        view
            .addEventListener(itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED,
                function globeInitialized() {
                    // eslint-disable-next-line no-console
                    console.info('Globe initialized');

                    Promise.all(promises).then(function init() {



                        var planarCamera = planarView.camera.camera3D;
                        var globeCamera = view.camera.camera3D;
                        var params;
                        travel(view).then(travel).catch(console.error);
                        $('#com_viewChange').click(function () {
                            var clicks = $(this).data('clicks');
                            if (clicks) {
                                // odd clicks
                                travel3d(view).then(travel3d).catch(console.error);
                                travel3d(planarView).then(travel3d).catch(console.error);
                            } else {
                                // even clicks
                                travel2d(view).then(travel2d).catch(console.error);
                                travel2d(planarView).then(travel2d).catch(console.error);
                            }
                            $(this).data("clicks", !clicks);
                        });
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

        $('#com_Itowns1').click(() => {
            if (this.getDisabled1) {
                this.changeDisabled1()
            }

            if (!this.getDisabled2) {
                this.changeDisabled2()
            }


        })
        $('#com_Itowns2').click(() => {
            if (this.getDisabled2) {
                this.changeDisabled2()
            }
            if (!this.getDisabled1) {
                this.changeDisabled1()
            }

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
    z-index: 100;
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
    z-index: 100;
    color: white;
    padding-left: 10px;
}

#com_viewChange {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 48%;
    bottom: 12vh;
    border-radius: 100%;

}

/* #com_viewChange:hover {
    cursor: pointer;
} */

#com_indic {
    position: relative;
    left: 42%;
    top: 2vh;
    color: white;
}

#com_fiche1 {
    position: absolute;
    left: 0;
    bottom: 10vh;
    max-height: 20vh;
    width: 50%;
    background-color: black;
    /* border-right: 5px solid black; */
    overflow: auto;
    z-index: 100;

}



#com_fiche2 {
    position: absolute;
    right: 0;
    bottom: 10vh;
    max-height: 20vh;
    width: 49.5%;
    background-color: black;
    overflow: auto;
    z-index: 100;
}

#com_fiche_btn {
    position: absolute;
    left: 2%;
    bottom: 2vh;
}

.com_count {
    text-align: center;
    background-color: black;
    color: white;
    width: 100%;
}

#com_boutonAn {
    position: absolute;
    bottom: 2vh;
    right: 8%;
}
</style>