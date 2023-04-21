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
            <option value="TRANS">Transport</option>
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
            <option value="TRANS">Transport</option>
            <option value="ENS">Enseignement</option>
            <option value="SAN">Sante</option>
            <option value="AUTRE">Autre</option>
        </select>
        <table class="table table-dark table-striped nowrap" id="com_table2">

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
    <div id="com_stats1">
        <div v-if="getScen1Text != undefined">
            <div id="messageAlter" class="com_stats_title"><span>Statistiques en cas de crue de {{ getScen1Text }}</span>
            </div>
            <ul>
                <li>Enseignement : {{ infosStats.elevesImpact1 }} élèves impactés sur {{ infosStats.totalEleves1 }} soit {{
                    infosStats.pourcentageEleves1 }} %</li>
            </ul>
            <br>
            <ul>
                <li>Santé : {{ infosStats.popSanteImpact1 }} patients impactés sur {{ infosStats.totalPopSante1 }} soit {{
                    infosStats.pourcentageSante1 }} %</li>
            </ul>
        </div>
        <div id="messageAlter" v-else>Veuillez sélectionner un scénario</div>
    </div>
    <div id="com_stats2">
        <div v-if="getScen2Text != undefined">
            <div id="messageAlter" class="com_stats_title"><span>Statistiques en cas de crue de {{ getScen2Text }}</span>
            </div>
            <ul>
                <li>Enseignement : {{ infosStats.elevesImpact2 }} élèves impactés sur {{ infosStats.totalEleves2 }} soit {{
                    infosStats.pourcentageEleves2 }} %</li>
            </ul>
            <br>
            <ul>
                <li>Santé : {{ infosStats.popSanteImpact2 }} patients impactés sur {{ infosStats.totalPopSante2 }} soit {{
                    infosStats.pourcentageSante2 }} %</li>
            </ul>
        </div>
        <div id="messageAlter" v-else>Veuillez sélectionner un scénario</div>
    </div>
    <div id="com_footer">
        <div id="com_btns">
            <button type="button" class="btn btn-light" id="com_fiche_btn">{{ getFicheTitle }}</button>
            <button type="button" class="btn btn-light" id="com_btn_stats">{{ getStatsTitle }}</button>
        </div>
        <div id="com_indic">
            <p>Ctrl+souris pour utiliser la 3D</p>
        </div>
        <img src="../../assets/logoBlack.png" width="60" height="60" />
        <div id="com_boutonAn"> <a href="/TRIVial"><button type="button" class="btn btn-outline-success  ">
                    MENU</button></a></div>

    </div>

    <button id="com_viewChange" type="button" class="btn btn-dark">{{ getViewType }}</button>
</template>
<script>
import * as itowns from "../../../node_modules/itowns/dist/itowns";
import api2itowns from './api2itowns2.js'
import api2stats from '../../js/api2stats'
import Scene1 from '@/components/Comparaisons/Scene1.vue'
import Scene2 from '@/components/Comparaisons/Scene2.vue'

import '../../css/widgets.css';
import $ from 'jquery'

//import the vuejs Dom reference function
import { ref } from 'vue';

let textScenario = {
    "04Fai": "probabilité faible",
    "02Moy": "probabilité moyenne",
    "01For": "probabilité forte"

}

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
            scen1: [],
            scen2: [],
            componentKey: ref(0),
            viewType: "2D",
            fiche: "Voir les informations",
            title_stats: "Voir les statistiques",
            featuresIntersect: [],
            ClonefeaturesIntersect: [],
            featuresIntersect2: [],
            ClonefeaturesIntersect2: [],
            disabledScn1: true,
            disabledScn2: true,
            zoomdata1: [],
            zoomdata2: [],
            infosStats: {
                totalEleves1: 0,
                elevesImpact1: 0,
                pourcentageEleves1: 0,
                totalPopSante1: 0,
                popSanteImpact1: 0,
                pourcentageSante1: 0,
                totalEleves2: 0,
                elevesImpact2: 0,
                pourcentageEleves2: 0,
                totalPopSante2: 0,
                popSanteImpact2: 0,
                pourcentageSante2: 0,
            }
        }
    },
    computed: {
        getScen1() {
            return this.scen1
        },
        getScen2() {
            return this.scen2
        },
        getScen1Text() {
            return textScenario[this.getScen1]
        },
        getScen2Text() {
            return textScenario[this.getScen2]
        },
        getViewType() {
            return this.viewType
        },
        getFicheTitle() {
            return this.fiche
        },
        getStatsTitle() {
            return this.title_stats
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
        },
        getzoomdata1() {
            return this.zoomdata1
        },
        getzoomdata2() {
            return this.zoomdata2
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
                $('#com_btn_stats')[0].disabled = true;
            } else {
                this.fiche = 'Voir les informations'
                $('#com_btn_stats')[0].disabled = false;
            }
        },
        changeStatsTitle() {
            if (this.title_stats == 'Voir les statistiques') {
                this.title_stats = 'Masquer les statistiques'
                $('#com_fiche_btn')[0].disabled = true;
            } else {
                this.title_stats = 'Voir les statistiques'
                $('#com_fiche_btn')[0].disabled = false;
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
        },
        changezoomdata1(data) {
            this.zoomdata1 = data
        },
        changezoomdata2(data) {
            this.zoomdata2 = data
        }

    },
    mounted() {

        $('#com_table1').click(false)

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
        const stats1 = $("#com_stats1")
        const stats2 = $("#com_stats2")
        const action = $('#com_fiche_btn')
        const btn_stats = $('#com_btn_stats')
        fiche1.hide()
        fiche2.hide()
        stats1.hide()
        stats2.hide()

        action.click(() => {
            fiche1.slideToggle('slow')
            fiche2.slideToggle('slow')
            this.changeFicheTitle()
        })

        btn_stats.click(() => {
            stats1.slideToggle('slow')
            stats2.slideToggle('slow')
            this.changeStatsTitle();
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


        let addFeature = (data, table_name, views) => {
            let source = new itowns.FileSource({
                fetchedData: data,
                crs: 'EPSG:2154',
                format: 'application/json',
            });

            let newLayer = new itowns.FeatureGeometryLayer(table_name, {
                // Use a FileSource to load a single file once
                source: source,
                opacity: 1,
                style: new itowns.Style({
                    fill: {
                        color: new itowns.THREE.Color('#8220de'),
                        base_altitude: setAltitude,
                        extrusion_height: setExtrusions,
                    }
                })
            });

            function setExtrusions(properties) {

                return properties.hauteur + 1;

            }

            function setAltitude(properties) {
                return parseFloat(properties.z_median);
            }

            /*function setId(properties) {
                if (!properties.id) {
                    return properties.uuid;
                }
                else {
                    return properties.id;
                }

            }*/

            views.addLayer(newLayer)


        }

        let counter = 0
        let counter2 = 0
        let getProxy = (data) => {
            return JSON.parse(JSON.stringify(data))
        }

        let oldFeat1 = 0;
        let oldTableName
        console.log(oldFeat1)

        $('.scen1').change((e) => {
            $('#com_Itowns1').click()
            const value = e.target.value
            this.changeScene1(value)
            //Stats
            api2stats.getNbEleves("all", this.getScen1[0]).then(infos => {
                this.infosStats.totalEleves1 = infos[0];
                this.infosStats.elevesImpact1 = infos[1];
                this.infosStats.pourcentageEleves1 = infos[2];
            });
            api2stats.getNbPopSante("all", this.getScen1[0]).then(infos => {
                this.infosStats.totalPopSante1 = infos[0];
                this.infosStats.popSanteImpact1 = infos[1];
                this.infosStats.pourcentageSante1 = infos[2];
            })
            try {
                view.removeLayer('scenarios')
            } catch (err) {
                console.log(err)
            }
            createScenarioIntersect(this.getScen1[0], view).then(res => {
                const layers = view.getLayers()
                const enjeuxLayer = layers.filter(el => { return el.isFeatureGeometryLayer === true }).filter(el => { return el.id.split('_')[2] != 'flat' })
                console.log(res)
                enjeuxLayer.forEach((layer, index) => {
                    let newfeature = layer.source.fetchedData.features.filter(el => { return el.properties[`intersectwith_scenarios_${this.getScen2[0].toLowerCase()}`] == true && el.properties[`intersectwith_scenarios_${this.getScen1[0].toLowerCase()}`] == false })
                    layer.source.fetchedData.features = newfeature
                    layer.style.fill.color = new itowns.THREE.Color('#FF9900')
                    console.log(layer.source)

                    let source = new itowns.FileSource({
                        fetchedData: layer.source.fetchedData,
                        crs: 'EPSG:2154',
                        format: 'application/json',
                    });
                    let newLayerD = new itowns.FeatureGeometryLayer('#' + index + counter, {
                        // Use a FileSource to load a single file once
                        source: source,
                        opacity: 1,
                        style: layer.style
                    })

                    view.getLayers().forEach((l) => {
                        // if the table is updated, remove the previous layer 
                        if (('#' + index + counter - 1).toString() == l.id) {
                            view.removeLayer(('#' + index + counter - 1).toString(), true);
                        }
                    })

                    if (this.getScen1[0] != this.getScen2[0]) {
                        view.addLayer(newLayerD)
                    }





                })

                const featuresIntersectList = []
                const features = []
                layers.forEach((el, index) => {
                    const lastindex = el.id.split('_').length - 1
                    if (index > 2 && el.id.split('_')[lastindex] == (counter + counter2).toString() && el.id != 'trans_l_flat' + '_' + (counter + counter2).toString()) {
                        const featuresInt = el.source.fetchedData.features.filter(el => { return el.properties['intersectwith_scenarios_' + this.getScen1[0].toLowerCase()] === true })

                        featuresInt.forEach(ft => {
                            featuresIntersectList.push(ft.properties)
                            features.push(ft)
                        })
                    }

                })
                this.changeFtIntersect(featuresIntersectList)
                this.changezoomdata1(features)




                let ficheFeatureclick = $('#com_table1 tbody')
                ficheFeatureclick.click((e) => {
                    const keySur = e.target.parentNode.cells['1'].firstChild.data
                    const feature = this.getzoomdata1.filter(el => { return el.properties.id_bdtopo == keySur })
                    const coodinates = feature[0].geometry.coordinates[0][0]
                    const Xs = []
                    const Ys = []
                    coodinates.forEach(el => {
                        Xs.push(el[0])
                        Ys.push(el[1])
                    })
                    const getMin = (array) => {
                        let val
                        array.forEach((el, index) => {
                            if (index == 0) {
                                val = el
                            } else {
                                if (el < val) {
                                    val = el
                                }
                            }


                        })

                        return val
                    }

                    const getMax = (array) => {
                        let val
                        array.forEach((el, index) => {
                            if (index == 0) {
                                val = el
                            } else {
                                if (el > val) {
                                    val = el
                                }
                            }

                        })

                        return val
                    }

                    const Xmin = getMin(Xs)
                    const Ymin = getMin(Ys)
                    const Xmax = getMax(Xs)
                    const Ymax = getMax(Ys)


                    const Xmoy = (Xmin + Xmax) / 2
                    const Ymoy = (Ymin + Ymax) / 2

                    const act = []
                    const time = 5000

                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 10000, tilt: 90, time: time * 0.6 });
                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 400, time: time * 0.4 })

                    function zoomFeature(views) {
                        return itowns.CameraUtils
                            .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, act);
                    }

                    zoomFeature(view).then(zoomFeature).catch(console.error)

                    let tablename = feature[0].properties.enjeu.toLowerCase()

                    if (tablename == 'trans') {
                        tablename = 'trans_s'
                    }

                    //oldFeat1 = 'feat_' + tablename

                    fetch('http://localhost:3000/dataFeature/' + tablename + '/' + keySur).then(res => res.json()).then(data => {

                        view.getLayers().forEach((l) => {
                            // if the table is updated, remove the previous layer 
                            if ('feat_' + oldTableName + '_' + (oldFeat1 - 1).toString() == l.id) {
                                view.removeLayer('feat_' + oldTableName + '_' + (oldFeat1 - 1).toString(), true);
                            }
                        })

                        addFeature(data, 'feat_' + tablename + '_' + oldFeat1.toString(), view)

                        oldTableName = tablename

                        oldFeat1++

                        //console.log(data, view.getLayers())
                    })


                })

                counter++

            })

            const paramsScentest = { filters: getProxy(this.getScen1), columnFiltered: "scenario", color: '#66ACF6' };

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

        let oldFeat2 = 0;
        let oldTableName2


        $('.scen2').change((e) => {
            $('#com_Itowns2').click()
            const value = e.target.value
            this.changeScene2(value)
            //Stats
            api2stats.getNbEleves("all", this.getScen2[0]).then(infos => {
                this.infosStats.totalEleves2 = infos[0];
                this.infosStats.elevesImpact2 = infos[1];
                this.infosStats.pourcentageEleves2 = infos[2];
            });
            api2stats.getNbPopSante("all", this.getScen2[0]).then(infos => {
                this.infosStats.totalPopSante2 = infos[0];
                this.infosStats.popSanteImpact2 = infos[1];
                this.infosStats.pourcentageSante2 = infos[2];
            });
            try {
                planarView.removeLayer('scenarios')
            } catch (err) {
                console.log(err)
            }
            createScenarioIntersect(this.getScen2[0], planarView).then(res => {
                const layers = planarView.getLayers()
                console.log(res)
                const enjeuxLayer = layers.filter(el => { return el.isFeatureGeometryLayer === true }).filter(el => { return el.id.split('_')[2] != 'flat' })
                console.log(res)
                enjeuxLayer.forEach((layer, index) => {
                    let newfeature = layer.source.fetchedData.features.filter(el => { return el.properties[`intersectwith_scenarios_${this.getScen1[0].toLowerCase()}`] == true && el.properties[`intersectwith_scenarios_${this.getScen2[0].toLowerCase()}`] == false })
                    layer.source.fetchedData.features = newfeature
                    layer.style.fill.color = new itowns.THREE.Color('#FF9900')

                    let source = new itowns.FileSource({
                        fetchedData: layer.source.fetchedData,
                        crs: 'EPSG:2154',
                        format: 'application/json',
                    });
                    let newLayerD = new itowns.FeatureGeometryLayer('#' + index + counter2, {
                        // Use a FileSource to load a single file once
                        source: source,
                        opacity: 1,
                        style: layer.style
                    })

                    planarView.getLayers().forEach((l) => {
                        // if the table is updated, remove the previous layer 
                        if (('#' + index + counter2 - 1).toString() == l.id) {
                            planarView.removeLayer(('#' + index + counter2 - 1).toString(), true);
                        }
                    })

                    if (this.getScen2[0] != this.getScen1[0]) {
                        planarView.addLayer(newLayerD)
                    }



                })
                const featuresIntersectList2 = []
                const features2 = []
                layers.forEach((el, index) => {
                    const lastindex = el.id.split('_').length - 1
                    if (index > 2 && el.id.split('_')[lastindex] == (counter + counter2).toString() && el.id != 'trans_l_flat' + '_' + (counter + counter2).toString()) {
                        const featuresInt = el.source.fetchedData.features.filter(el => { return el.properties['intersectwith_scenarios_' + this.getScen2[0].toLowerCase()] === true })
                        featuresInt.forEach(ft => {
                            featuresIntersectList2.push(ft.properties)
                            features2.push(ft)
                        })
                    }

                })
                this.changeFtIntersect2(featuresIntersectList2)
                this.changezoomdata2(features2)

                let ficheFeatureclick2 = $('#com_table2 tbody')
                ficheFeatureclick2.click((e) => {
                    const keySur = e.target.parentNode.cells['1'].firstChild.data
                    const feature = this.getzoomdata2.filter(el => { return el.properties.id_bdtopo == keySur })
                    const coodinates = feature[0].geometry.coordinates[0][0]
                    const Xs = []
                    const Ys = []
                    coodinates.forEach(el => {
                        Xs.push(el[0])
                        Ys.push(el[1])
                    })
                    const getMin = (array) => {
                        let val
                        array.forEach((el, index) => {
                            if (index == 0) {
                                val = el
                            } else {
                                if (el < val) {
                                    val = el
                                }
                            }

                        })

                        return val
                    }

                    const getMax = (array) => {
                        let val
                        array.forEach((el, index) => {
                            if (index == 0) {
                                val = el
                            } else {
                                if (el > val) {
                                    val = el
                                }
                            }

                        })

                        return val
                    }

                    const Xmin = getMin(Xs)
                    const Ymin = getMin(Ys)
                    const Xmax = getMax(Xs)
                    const Ymax = getMax(Ys)


                    const Xmoy = (Xmin + Xmax) / 2
                    const Ymoy = (Ymin + Ymax) / 2

                    const act = []
                    const time = 5000

                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 10000, tilt: 90, time: time * 0.6 });
                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 400, time: time * 0.4 })

                    function zoomFeature(views) {
                        return itowns.CameraUtils
                            .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, act);
                    }

                    zoomFeature(planarView).then(zoomFeature).catch(console.error)
                    let tablename2 = feature[0].properties.enjeu.toLowerCase()

                    if (tablename2 == 'trans') {
                        tablename2 = 'trans_s'
                    }

                    //oldFeat1 = 'feat_' + tablename

                    fetch('http://localhost:3000/dataFeature/' + tablename2 + '/' + keySur).then(res => res.json()).then(data => {
                        console.log(oldFeat2, 'feat_' + oldTableName2 + '_' + (oldFeat2 - 1).toString())
                        planarView.getLayers().forEach((l) => {
                            // if the table is updated, remove the previous layer 
                            if ('feat_' + oldTableName2 + '_' + (oldFeat2 - 1).toString() == l.id) {
                                planarView.removeLayer('feat_' + oldTableName2 + '_' + (oldFeat2 - 1).toString(), true);
                            }
                        })

                        addFeature(data, 'feat_' + tablename2 + '_' + oldFeat2.toString(), planarView)

                        oldTableName2 = tablename2

                        oldFeat2++

                        //console.log(data, view.getLayers())
                    })


                })
                counter2++

            })
            const paramsScentest = { filters: getProxy(this.getScen2), columnFiltered: "scenario", color: '#66ACF6' };
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

#com_stats1 {
    position: absolute;
    left: 0;
    bottom: 10vh;
    max-height: 20vh;
    width: 50%;
    background-color: black;
    color: white;
    overflow: auto;
    z-index: 200;

}

#com_stats2 {
    position: absolute;
    right: 0;
    bottom: 10vh;
    max-height: 20vh;
    width: 50%;
    background-color: black;
    color: white;
    overflow: auto;
    z-index: 200;

}

#com_btns {
    position: absolute;
    left: 2%;
    bottom: 2vh;
    width: 40%;
}

#com_btn_stats {
    margin-left: 2%;
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

#messageAlter {
    text-align: center;
    margin-bottom: 2%;
}

.com_filt {
    width: 30%;

}

#com_table1 tbody tr:hover {
    cursor: pointer;
    border: 2px solid #8220de;
}


#com_table2 tbody tr:hover {
    cursor: pointer;
    border: 2px solid #8220de;
}
</style>