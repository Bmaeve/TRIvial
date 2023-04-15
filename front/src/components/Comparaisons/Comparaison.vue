<template>
    <div id="com_scen1">
        <span>Probabilité du scénario 1</span>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="04Fai"
                :disabled="getDisabled1">
            <label class="form-check-label " for="flexRadioDefault1">
                Faible
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="02Moy"
                :disabled="getDisabled1">
            <label class="form-check-label" for="flexRadioDefault2">
                Moyenne
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="01For"
                :disabled="getDisabled1">
            <label class="form-check-label" for="flexRadioDefault3">
                Forte
            </label>
        </div>
        <span style="font-size: .7em;">Cliquez sur la carte pour activer</span>
    </div>
    <div id="com_scen2">
        <span>Probabilité du scénario 2</span>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault4" value="04Fai"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault4">
                Faible
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault5" value="02Moy"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault5">
                Moyenne
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault6" value="01For"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault6">
                Forte
            </label>
        </div>
        <span style="font-size: .7em;">Cliquez sur la carte pour activer</span>
    </div>
    <div id="com_box">
        <Scene1 />
        <Scene2 />
    </div>
    <div id="com_fiche1">
        <div class="com_count"><span>Bâtiment(s) touché(s) ({{ getCount1 }})</span></div>
        <select id="com_filter1" class="form-select com_filt" aria-label="Default select example">
            <option value="ALL">Tous</option>
            <option value="ADMIN">Administration</option>
            <option value="DEF">Defense</option>
            <option value="INDUS">Industrie</option>
            <option value="PATRIM">Patrimoine</option>
            <option value="ENS">Enseignement</option>
            <option value="SAN">Sante</option>
            <option value="AUTRE">Autre</option>
        </select>
        <table class="table table-dark table-striped nowrap" id="com_table1">
            <!-- Feature properties table header -->
            <thead>
                <tr>
                    <th scope="col">ID TRI</th>
                    <th scope="col">ID DBTOPO</th>
                    <th scope="col">ENJEU
                    </th>
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
        <div class="com_count"><span>Bâtiment(s) touché(s) ({{ getCount2 }})</span></div>
        <select id="com_filter2" class="form-select com_filt" aria-label="Default select example">
            <option value="ALL">Tous</option>
            <option value="ADMIN">Administration</option>
            <option value="DEF">Defense</option>
            <option value="INDUS">Industrie</option>
            <option value="PATRIM">Patrimoine</option>
            <option value="ENS">Enseignement</option>
            <option value="SAN">Sante</option>
            <option value="AUTRE">Autre</option>
        </select>
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
            <p>Ctrl+souris pour utiliser la 3D</p>

        </div>
        <img src="../../assets/logo.png" width="60" height="60" />
        <div id="com_boutonAn"> <a href="/TRIVial"><button type="button" class="btn btn-outline-success  ">
                    MENU</button></a></div>

    </div>

    <button id="com_viewChange" type="button" class="btn btn-dark">{{ getViewType }}</button>
</template>
<script>
import * as itowns from "../../../node_modules/itowns/dist/itowns";
import api2itowns from './api2itowns2.js'
import Scene1 from '@/components/Comparaisons/Scene1.vue'
import Scene2 from '@/components/Comparaisons/Scene2.vue'

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
            fiche: "Voir les informations",
            featuresIntersect: [],
            ClonefeaturesIntersect: [],
            featuresIntersect2: [],
            ClonefeaturesIntersect2: [],
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
            if (this.fiche == 'Voir les informations') {
                this.fiche = 'Masquer les informations'
            } else {
                this.fiche = 'Voir les informations'
            }
        },
        changeFtIntersect(data) {
            this.featuresIntersect = data
            this.ClonefeaturesIntersect = data
            $('#com_filter1').val('ALL')
        },
        changeFtIntersect2(data) {
            this.featuresIntersect2 = data
            this.ClonefeaturesIntersect2 = data
            $('#com_filter2').val('ALL')
        },
        changeDisabled1() {
            this.disabledScn1 = !this.disabledScn1
        },
        changeDisabled2() {
            this.disabledScn2 = !this.disabledScn2
        },
        filterIntersect(value) {
            this.featuresIntersect = this.ClonefeaturesIntersect
            if (value == 'ALL') {
                this.featuresIntersect = this.ClonefeaturesIntersect
            } else {
                const filt = this.featuresIntersect.filter(el => { return el.enjeu == value })
                this.featuresIntersect = filt
            }
        },
        filterIntersect2(value) {
            this.featuresIntersect2 = this.ClonefeaturesIntersect2
            if (value == 'ALL') {
                this.featuresIntersect2 = this.ClonefeaturesIntersect2
            } else {

                const filt = this.featuresIntersect2.filter(el => { return el.enjeu == value })
                this.featuresIntersect2 = filt
            }
        }

    },
    mounted() {

        const filter1Val = $('#com_filter1')
        const filter2Val = $('#com_filter2')

        filter1Val.change(e => {

            this.filterIntersect(e.target.value)
        })

        filter2Val.change(e => {

            this.filterIntersect2(e.target.value)
        })

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
        let IGN_MNT = require('../DEMConfig/IGN_MNT_HIGHRES.json')
        let WORLD_DTM = require('../DEMConfig/WORLD_DTM.json')

        console.log(IGN_MNT, WORLD_DTM)

        // defined in a json file.
        function addElevationLayerFromConfig(config, name) {
            config.source.name = name
            config.source = new itowns.WMTSSource(config.source);
            view.addLayer(
                new itowns.ElevationLayer(config.id, config),
            );
        }
        addElevationLayerFromConfig(IGN_MNT, 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES');
        addElevationLayerFromConfig(WORLD_DTM, 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3');

        // Define the source of the dem data


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
                trans_l_flat: {
                    color: 'white',
                    concernedByScenario: scenario
                }
            }

            return api2itowns.addEnjeuxToView(views, params)


        }

        let counter = 0
        let counter2 = 0
        let getProxy = (data) => {
            return JSON.parse(JSON.stringify(data))
        }

        $('.scen1').change((e) => {
            $('#com_Itowns1').click()


            const value = e.target.value
            this.changeScene1(value)


            try {

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
                    if (index > 2 && el.id.split('_')[lastindex] == (counter + counter2).toString() && el.id != 'trans_l_flat' + '_' + (counter + counter2).toString()) {
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

        // defined in a json file.
        let IGN_MNT2 = require('../DEMConfig/IGN_MNT_HIGHRES.json')
        let WORLD_DTM2 = require('../DEMConfig/WORLD_DTM.json')
        function addElevationLayerFromConfig2(config, name) {
            config.source.name = name
            config.source = new itowns.WMTSSource(config.source);
            planarView.addLayer(
                new itowns.ElevationLayer(config.id, config),
            );
        }
        addElevationLayerFromConfig2(IGN_MNT2, 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES1');
        addElevationLayerFromConfig2(WORLD_DTM2, 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM32');

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
                    if (index > 2 && el.id.split('_')[lastindex] == (counter + counter2).toString() && el.id != 'trans_l_flat' + '_' + (counter + counter2).toString()) {
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

.com_filt {
    width: 30%;
}
</style>