<!-- Compare component -->
<template>
    <!-- select options container for left map -->
    <div id="com_scen1">
        <span>Probabilité du scénario 1</span>
        <!-- left map probality 4fai -->
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="04Fai"
                :disabled="getDisabled1">
            <label class="form-check-label " for="flexRadioDefault1">
                Faible
            </label>
        </div>
        <!-- left map probality 2Moy -->
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="02Moy"
                :disabled="getDisabled1">
            <label class="form-check-label" for="flexRadioDefault2">
                Moyenne
            </label>
        </div>
        <!-- left map probality 1for -->
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="01For"
                :disabled="getDisabled1">
            <label class="form-check-label" for="flexRadioDefault3">
                Forte
            </label>
        </div>
        <br>
        <!-- left map active diff -->
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="getdiff1" value="true"
                :disabled="getDisabled1">
            <label class="form-check-label" for="getdiff1">
                Voir difference
            </label>
        </div>
        <span style="font-size: .7em;">Cliquez sur la carte pour activer</span>
    </div>
    <!-- select option container for right map -->
    <div id="com_scen2">
        <span>Probabilité du scénario 2</span>
        <!-- right map probality 4fai -->
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault4" value="04Fai"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault4">
                Faible
            </label>
        </div>
        <!-- right map probality 2Moy -->
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault5" value="02Moy"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault5">
                Moyenne
            </label>
        </div>
        <!-- right map probality 1for -->
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault6" value="01For"
                :disabled="getDisabled2">
            <label class="form-check-label" for="flexRadioDefault6">
                Forte
            </label>
        </div>
        <br>
        <!-- right map active diff -->
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="getdiff2" value="true"
                :disabled="getDisabled2">
            <label class="form-check-label" for="getdiff2">
                Voir difference
            </label>
        </div>
        <span style="font-size: .7em;">Cliquez sur la carte pour activer</span>
    </div>
    <div id="com_box">
        <!-- letf map scene container -->
        <Scene1 />
        <!-- right map scene container -->
        <Scene2 />
    </div>
    <!-- left map building intersected table -->
    <div id="com_fiche1">
        <div class="com_count"><span>Bâtiment(s) touché(s) ({{ getCount1 }})</span></div>
        <!-- building type filter -->
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
    <!-- right map building intersected table -->
    <div id="com_fiche2">
        <div class="com_count"><span>Bâtiment(s) touché(s) ({{ getCount2 }})</span></div>
        <!-- building type filter -->
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
    <!-- footer container -->
    <div id="com_footer">
        <div id="com_btns">
            <!-- show table container button -->
            <button type="button" class="btn btn-light" id="com_fiche_btn">{{ getFicheTitle }}</button>
            <button type="button" class="btn btn-light" id="com_btn_stats">{{ getStatsTitle }}</button>
        </div>
        <div id="com_indic">
            <p>Ctrl+souris pour utiliser la 3D</p>
        </div>
        <!-- Trivial image -->
        <img src="../../assets/logoBlack.png" width="60" height="60" />
        <!-- go menu button -->
        <div id="com_boutonAn"> <a href="/TRIVial"><button type="button" class="btn btn-outline-success  ">
                    MENU</button></a></div>

    </div>

    <button id="com_viewChange" type="button" class="btn btn-dark">{{ getViewType }}</button>
</template>
<script>
// import itowns module
import * as itowns from "../../../node_modules/itowns/dist/itowns";
// import itowns api
import api2itowns from './api2itowns2.js'
import api2stats from '../../js/api2stats'
// import left scene component
import Scene1 from '@/components/Comparaisons/Scene1.vue'
// import right scene component
import Scene2 from '@/components/Comparaisons/Scene2.vue'

import '../../css/widgets.css';
// import jquery css
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
            // component key
            componentKey: ref(0),
            // change scene dimension type text
            viewType: "2D",
            fiche: "Voir les informations",
            title_stats: "Voir les statistiques",
            // left scene building intersected list
            featuresIntersect: [],
            // left scene building intersected list clone
            ClonefeaturesIntersect: [],
            // right scene building intersected
            featuresIntersect2: [],
            // right scene building intersected list
            ClonefeaturesIntersect2: [],
            disabledScn1: true,
            disabledScn2: true,
            // zoom feature data for left scene
            zoomdata1: [],
            // zoom feature data for right scene
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
        // dynamique get scene dimension
        getViewType() {
            return this.viewType
        },
        // dynamique get table button title
        getFicheTitle() {
            return this.fiche
        },
        getStatsTitle() {
            return this.title_stats
        },
        // dynamique get building intersect data for left scene
        getFeatureIntersect() {
            return this.featuresIntersect
        },
        // dynamique get building intersect data for right scene
        getFeatureIntersect2() {
            return this.featuresIntersect2
        },
        // dynamique get building intersect count for left scene
        getCount1() {
            return this.featuresIntersect.length
        },
        // dynamique get building intersect data for right scene
        getCount2() {
            return this.featuresIntersect2.length
        },
        // dynamique get probality options container active/disabled for left scene
        getDisabled1() {
            return this.disabledScn1
        },
        // dynamique get probality options container active/disabled for right scene
        getDisabled2() {
            return this.disabledScn2
        },
        // dynamique zoom feature data for left data
        getzoomdata1() {
            return this.zoomdata1
        },
        // dynamique zoom feature data for right data
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
        //change component renderer key
        forceRerender() {
            this.componentKey += 1;
        },
        // change dimension type
        changeViewType() {
            if (this.viewType == "2D") {
                this.viewType = "3D"
            } else {
                this.viewType = "2D"
            }
        },
        // change show/hide building intersect table button title
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
        // change intersect building data for left scene
        changeFtIntersect(data) {
            this.featuresIntersect = data
            this.ClonefeaturesIntersect = data
            $('#com_filter1').val('ALL')
        },
        // change intersect building data for right scene
        changeFtIntersect2(data) {
            this.featuresIntersect2 = data
            this.ClonefeaturesIntersect2 = data
            $('#com_filter2').val('ALL')
        },
        // change scenario probality container active/disabled for left scene 
        changeDisabled1() {
            this.disabledScn1 = !this.disabledScn1
        },
        // change scenario probality container active/disabled for right scene 
        changeDisabled2() {
            this.disabledScn2 = !this.disabledScn2
        },
        // table filter by type building for left scene
        filterIntersect(value) {
            this.featuresIntersect = this.ClonefeaturesIntersect
            if (value == 'ALL') {
                this.featuresIntersect = this.ClonefeaturesIntersect
            } else {
                const filt = this.featuresIntersect.filter(el => { return el.enjeu == value })
                this.featuresIntersect = filt
            }
        },
        // table filter by type building for right scene
        filterIntersect2(value) {
            this.featuresIntersect2 = this.ClonefeaturesIntersect2
            if (value == 'ALL') {
                this.featuresIntersect2 = this.ClonefeaturesIntersect2
            } else {

                const filt = this.featuresIntersect2.filter(el => { return el.enjeu == value })
                this.featuresIntersect2 = filt
            }
        },
        // change zoom feature data for left scene
        changezoomdata1(data) {
            this.zoomdata1 = data
        },
        // change zoom feature data for right scene
        changezoomdata2(data) {
            this.zoomdata2 = data
        }

    },
    mounted() {

        $('#com_table1').click(false)
        // filter select div for left table
        const filter1Val = $('#com_filter1')
        // filter select div for right table
        const filter2Val = $('#com_filter2')

        filter1Val.change(e => {
            // change filter value
            this.filterIntersect(e.target.value)
        })

        filter2Val.change(e => {
            // change filter value
            this.filterIntersect2(e.target.value)
        })

        // buiding intersect table for left scene
        const fiche1 = $('#com_fiche1')
        // buiding intersect table for right scene
        const fiche2 = $('#com_fiche2')

        const stats1 = $("#com_stats1")
        const stats2 = $("#com_stats2")
        const action = $('#com_fiche_btn')
        const btn_stats = $('#com_btn_stats')
        // initial hide left fiche
        fiche1.hide()
        // initial hide right fiche
        fiche2.hide()
        stats1.hide()
        stats2.hide()

        // show/hide building intersect tables
        action.click(() => {
            fiche1.slideToggle('slow')
            fiche2.slideToggle('slow')
            // change show/hide button title
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

        // 5s waiting
        setTimeout(() => {
            // listen mouve move for left scene
            viewerDiv.addEventListener('mousemove', function _() {
                overGlobe = true;
            }, false);
            // listen mouve move for right scene
            planarDiv.addEventListener('mousemove', function _() {
                overGlobe = false;
            }, false);
        }, 5000)

        // Ortho wmts config
        var orthoScene1 = require('./Ortho.json')

        // create scene 1 ortho source
        orthoScene1.source = new itowns.WMTSSource(orthoScene1.source);
        // create scene 1 ortho layer
        var layer = new itowns.ColorLayer(orthoScene1.id, orthoScene1);
        // add ortho layer in left scene view
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
        // add MNT layer in left scene view
        addElevationLayerFromConfig(IGN_MNT, 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES');
        // add DTM layer in left scene view
        addElevationLayerFromConfig(WORLD_DTM, 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM3');

        // Define the source of the dem data

        // add intersect layer by scenario function
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

        // add zoom feature in letf scene
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


            views.addLayer(newLayer)


        }

        let counter = 0
        let counter2 = 0
        let counter_1diff = 0
        let counter_2diff = 0
        // convert proxy data to string
        let getProxy = (data) => {
            return JSON.parse(JSON.stringify(data))
        }

        let oldFeat1 = 0;
        let oldTableName

        // left scene probality option click
        $('.scen1').change((e) => {
            $('#com_Itowns1').click()
            // get option value
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
                // remove old scenario layer
                view.removeLayer('scenarios')
            } catch (err) {
                console.log(err)
            }

            // add intersected layers with a scenario
            createScenarioIntersect(this.getScen1[0], view).then(res => {
                const layers = view.getLayers()

                console.log(res)

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

                // change intersect layers
                this.changeFtIntersect(featuresIntersectList)
                // change zoom feature data
                this.changezoomdata1(features)






                let ficheFeatureclick = $('#com_table1 tbody')
                // listen table line click
                ficheFeatureclick.click((e) => {
                    // get line id_dbtopo value
                    const keySur = e.target.parentNode.cells['1'].firstChild.data
                    // get feature by id_dbtopo value
                    const feature = this.getzoomdata1.filter(el => { return el.properties.id_bdtopo == keySur })
                    // get feature vertex
                    const coodinates = feature[0].geometry.coordinates[0][0]
                    const Xs = []
                    const Ys = []

                    coodinates.forEach(el => {
                        // X vertex list
                        Xs.push(el[0])
                        // Y vertex list
                        Ys.push(el[1])
                    })

                    // get array min value function
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
                    // get array max value function
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

                    // get extent cordinates
                    const Xmin = getMin(Xs)
                    const Ymin = getMin(Ys)
                    const Xmax = getMax(Xs)
                    const Ymax = getMax(Ys)

                    // get gravity center cordinates
                    const Xmoy = (Xmin + Xmax) / 2
                    const Ymoy = (Ymin + Ymax) / 2

                    const act = []
                    const time = 5000

                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 10000, tilt: 90, time: time * 0.6 });
                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 400, time: time * 0.4 })

                    // zoom feature animation
                    function zoomFeature(views) {
                        return itowns.CameraUtils
                            .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, act);
                    }

                    zoomFeature(view).then(zoomFeature).catch(console.error)

                    let tablename = feature[0].properties.enjeu.toLowerCase()

                    if (tablename == 'trans') {
                        tablename = 'trans_s'
                    }


                    // load feature data from api
                    fetch('http://localhost:3000/dataFeature/' + tablename + '/' + keySur).then(res => res.json()).then(data => {

                        // remove old zoom feature
                        view.getLayers().forEach((l) => {
                            // if the table is updated, remove the previous layer 
                            if ('feat_' + oldTableName + '_' + (oldFeat1 - 1).toString() == l.id) {
                                view.removeLayer('feat_' + oldTableName + '_' + (oldFeat1 - 1).toString(), true);
                            }
                        })

                        // add new zoom feature 
                        addFeature(data, 'feat_' + tablename + '_' + oldFeat1.toString(), view)

                        // init old table name
                        oldTableName = tablename

                        // increment feature index
                        oldFeat1++

                    })


                })


                // create diff intersect buildings with scenario
                let addDiffLayers = () => {
                    let layersClone = [...view.getLayers()]
                    let enjeuxLayer = layersClone.filter(el => { return el.isFeatureGeometryLayer === true }).filter(el => { return el.id.split('_')[2] != 'flat' })
                    view.getLayers().forEach((l) => {

                        const lastindexsplit = l.id.split('_').length - 1

                        if ((l.id.split('')[0]).toString() == '#' && l.id.split('_')[lastindexsplit].toString() == (counter_1diff - 1).toString()) {

                            view.removeLayer(l.id, true)
                        }

                    })

                    const getLevelScen = (scene) => {
                        let level
                        switch (scene) {
                            case '01For':
                                level = 0
                                break
                            case '02Moy':
                                level = 1
                                break
                            case '04Fai':
                                level = 2
                                break
                            default:
                                level = null
                        }

                        return level
                    }


                    function setExtrusions(properties) {

                        return properties.hauteur + 1;

                    }

                    function setAltitude(properties) {
                        return parseFloat(properties.z_median);
                    }

                    enjeuxLayer.forEach((lay, index) => {

                        if (getLevelScen(this.getScen1[0]) < getLevelScen(this.getScen2[0])) {
                            let newfeature = lay.source.fetchedData.features.filter(el => { return el.properties[`intersectwith_scenarios_${this.getScen2[0].toLowerCase()}`] === true && el.properties[`intersectwith_scenarios_${this.getScen1[0].toLowerCase()}`] === false })

                            lay.source.fetchedData.features = newfeature
                            lay.style.fill.color = new itowns.THREE.Color('#FF9900')
                            lay.style.fill.base_altitude = setAltitude
                            lay.style.fill.extrusion_height = setExtrusions

                            let source1 = new itowns.FileSource({
                                fetchedData: lay.source.fetchedData,
                                crs: 'EPSG:2154',
                                format: 'application/json',
                            });
                            let newLayerD1 = new itowns.FeatureGeometryLayer('#' + index + '_' + counter_1diff, {
                                // Use a FileSource to load a single file once
                                source: source1,
                                opacity: 1,
                                style: lay.style
                            })
                            view.addLayer(newLayerD1)

                        }

                    })

                    counter_1diff++

                }

                if ($('#getdiff1').is(":checked")) {
                    try {
                        setTimeout(() => {
                            addDiffLayers()
                        }, 3000)

                    } catch (err) {
                        console.log(err)
                    }

                } else {

                    if (counter_1diff > 0) {
                        view.getLayers().forEach((l) => {

                            const lastindexsplit = l.id.split('_').length - 1

                            if ((l.id.split('')[0]).toString() == '#' && l.id.split('_')[lastindexsplit].toString() == (counter_1diff - 1).toString()) {

                                view.removeLayer(l.id, true)
                            }

                        })
                    }

                }

                counter++

            })

            // add scenario layer
            const paramsScentest = { filters: getProxy(this.getScen1), columnFiltered: "scenario", color: '#66ACF6' };

            api2itowns.addLayerToView(view, "scenarios", paramsScentest);

        })



        // Listen for globe full initialisation event
        const time = 5000;
        const pathTravel = [];

        pathTravel.push({ coord: new itowns.Coordinates('EPSG:4326', 2.340, 48.858), range: 20000, time: time * 0.4 });

        pathTravel.push({ tilt: 15, time: time * 0.6 });

        const Travel2D = [];
        Travel2D.push({ tilt: 90, time: time * 0.6 });

        const Travel3D = [];
        Travel3D.push({ tilt: 15, time: time * 0.6 });

        // initale animation
        function travel(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, pathTravel);
        }

        // travel for 2d animation
        function travel2d(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, Travel2D);
        }

        // travle 3d animation
        function travel3d(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, Travel3D);
        }
        // Ortho wmts config
        var orthoScene2 = require('./Ortho.json')
        // create scene 2ortho source
        var wmsImageryLayer = new itowns.ColorLayer(orthoScene2.id, orthoScene2);
        // add ortho layer in right scene view
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

        // add MNT layer in right scene view
        addElevationLayerFromConfig2(IGN_MNT2, 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES1');
        // add DTM layer in right scene view
        addElevationLayerFromConfig2(WORLD_DTM2, 'ELEVATION.ELEVATIONGRIDCOVERAGE.SRTM32');

        let oldFeat2 = 0;
        let oldTableName2

        // add intersect layer by scenario function
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
                // remove old scenario layer
                planarView.removeLayer('scenarios')
            } catch (err) {
                console.log(err)
            }

            // add intersected layers with a scenario
            createScenarioIntersect(this.getScen2[0], planarView).then(res => {
                const layers2 = planarView.getLayers()
                console.log(res)

                const featuresIntersectList2 = []
                const features2 = []
                layers2.forEach((el, index) => {
                    const lastindex = el.id.split('_').length - 1
                    if (index > 2 && el.id.split('_')[lastindex] == (counter + counter2).toString() && el.id != 'trans_l_flat' + '_' + (counter + counter2).toString()) {
                        const featuresInt = el.source.fetchedData.features.filter(el => { return el.properties['intersectwith_scenarios_' + this.getScen2[0].toLowerCase()] === true })
                        featuresInt.forEach(ft => {
                            featuresIntersectList2.push(ft.properties)
                            features2.push(ft)
                        })
                    }

                })

                // change intersect layers
                this.changeFtIntersect2(featuresIntersectList2)
                // change zoom feature data
                this.changezoomdata2(features2)

                let ficheFeatureclick2 = $('#com_table2 tbody')
                // listen table line click
                ficheFeatureclick2.click((e) => {
                    // get line id_dbtopo value
                    const keySur = e.target.parentNode.cells['1'].firstChild.data
                    // get feature by id_dbtopo value
                    const feature = this.getzoomdata2.filter(el => { return el.properties.id_bdtopo == keySur })
                    // get feature vertex
                    const coodinates = feature[0].geometry.coordinates[0][0]
                    const Xs = []
                    const Ys = []
                    coodinates.forEach(el => {
                        // X vertex list
                        Xs.push(el[0])
                        // Y vertex list
                        Ys.push(el[1])
                    })

                    // get array min value function
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
                    // get array max value function
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

                    // get extent cordinates
                    const Xmin = getMin(Xs)
                    const Ymin = getMin(Ys)
                    const Xmax = getMax(Xs)
                    const Ymax = getMax(Ys)

                    // get gravity center cordinates
                    const Xmoy = (Xmin + Xmax) / 2
                    const Ymoy = (Ymin + Ymax) / 2

                    const act = []
                    const time = 5000

                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 10000, tilt: 90, time: time * 0.6 });
                    act.push({ coord: new itowns.Coordinates('EPSG:2154', Xmoy, Ymoy), range: 400, time: time * 0.4 })

                    // zoom feature animation
                    function zoomFeature(views) {
                        return itowns.CameraUtils
                            .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, act);
                    }

                    zoomFeature(planarView).then(zoomFeature).catch(console.error)
                    let tablename2 = feature[0].properties.enjeu.toLowerCase()

                    if (tablename2 == 'trans') {
                        tablename2 = 'trans_s'
                    }


                    // load feature data from api
                    fetch('http://localhost:3000/dataFeature/' + tablename2 + '/' + keySur).then(res => res.json()).then(data => {

                        // remove old zoom feature
                        planarView.getLayers().forEach((l) => {
                            // if the table is updated, remove the previous layer 
                            if ('feat_' + oldTableName2 + '_' + (oldFeat2 - 1).toString() == l.id) {
                                planarView.removeLayer('feat_' + oldTableName2 + '_' + (oldFeat2 - 1).toString(), true);
                            }
                        })

                        // add new zoom feature
                        addFeature(data, 'feat_' + tablename2 + '_' + oldFeat2.toString(), planarView)

                        // init old table name
                        oldTableName2 = tablename2

                        // increment feature index
                        oldFeat2++

                    })


                })


                // create diff intersect buildings with scenario
                let addDiffLayers = () => {
                    let layersClone = [...planarView.getLayers()]
                    let enjeuxLayer = layersClone.filter(el => { return el.isFeatureGeometryLayer === true }).filter(el => { return el.id.split('_')[2] != 'flat' })
                    planarView.getLayers().forEach((l) => {

                        const lastindexsplit = l.id.split('_').length - 1

                        if ((l.id.split('')[0]).toString() == '#' && (l.id.split('_')[lastindexsplit]).toString() == (counter_2diff - 1).toString()) {
                            planarView.removeLayer(l.id, true)
                        }

                    })
                    const getLevelScen = (scene) => {
                        let level
                        switch (scene) {
                            case '01For':
                                level = 0
                                break
                            case '02Moy':
                                level = 1
                                break
                            case '04Fai':
                                level = 2
                                break
                            default:
                                level = null

                        }
                        return level
                    }



                    function setExtrusions(properties) {
                        return properties.hauteur + 1;
                    }

                    function setAltitude(properties) {
                        return parseFloat(properties.z_median);
                    }
                    enjeuxLayer.forEach((lay, index) => {

                        if (getLevelScen(this.getScen2[0]) < getLevelScen(this.getScen1[0])) {
                            let newfeature = lay.source.fetchedData.features.filter(el => { return el.properties[`intersectwith_scenarios_${this.getScen1[0].toLowerCase()}`] === true && el.properties[`intersectwith_scenarios_${this.getScen2[0].toLowerCase()}`] === false })

                            lay.source.fetchedData.features = newfeature
                            lay.style.fill.color = new itowns.THREE.Color('#FF9900')
                            lay.style.fill.base_altitude = setAltitude
                            lay.style.fill.extrusion_height = setExtrusions


                            let source2 = new itowns.FileSource({
                                fetchedData: lay.source.fetchedData,
                                crs: 'EPSG:2154',
                                format: 'application/json',
                            });
                            let newLayerD2 = new itowns.FeatureGeometryLayer(('#' + index + '_' + counter_2diff).toString(), {
                                // Use a FileSource to load a single file once
                                source: source2,
                                opacity: 1,
                                style: lay.style
                            })
                            planarView.addLayer(newLayerD2)

                        }

                    })

                    counter_2diff++
                }



                if ($('#getdiff2').is(":checked")) {
                    try {
                        setTimeout(() => {
                            addDiffLayers()
                        }, 3000)
                    } catch (err) {
                        console.log(err)
                    }

                } else {

                    if (counter_2diff > 0) {
                        planarView.getLayers().forEach((l) => {

                            const lastindexsplit = l.id.split('_').length - 1

                            if ((l.id.split('')[0]).toString() == '#' && (l.id.split('_')[lastindexsplit]).toString() == (counter_2diff - 1).toString()) {
                                planarView.removeLayer(l.id, true)
                            }

                        })
                    }

                }

                counter2++

                console.log(counter2)

            })
            // add scenario layer
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
    opacity: 0.7;
    position: absolute;
    left: 2%;
    top: 5vh;
    width: 15%;
    z-index: 100;
    color: white;
    padding-left: 10px;
}

#com_scen2 {
    background-color: black;
    opacity: 0.7;
    position: absolute;
    right: 2%;
    top: 5vh;
    width: 15%;
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