<template>
    <div id="com_scen1">
        <span>Scenario 1</span>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="04Fai">
            <label class="form-check-label " for="flexRadioDefault1">
                Faible
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="02Moy">
            <label class="form-check-label" for="flexRadioDefault2">
                Moyen
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="01For">
            <label class="form-check-label" for="flexRadioDefault3">
                Fort
            </label>
        </div>
    </div>
    <div id="com_scen2">
        <span>Scenario 2</span>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault4"
                value="04Fai">
            <label class="form-check-label" for="flexRadioDefault4">
                Faible
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault5"
                value="02Moy">
            <label class="form-check-label" for="flexRadioDefault5">
                Moyen
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input scen2" type="radio" name="flexRadioDefault2" id="flexRadioDefault6"
                value="01For">
            <label class="form-check-label" for="flexRadioDefault6">
                Fort
            </label>
        </div>
    </div>
    <div id="com_box">
        <Scene1 />
        <Scene2 />
    </div>
    <div id="com_footer">
        <img src="../../assets/logo.png" width="60" height="60" />
    </div>

    <button id="com_viewChange" type="button">{{ getViewType }}</button>
</template>
<script>
import * as itowns from "../../../node_modules/itowns/dist/itowns";
import itownApi from './api2itowns'
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
            scen2: ["04Fai"],
            componentKey: ref(0),
            viewType: "2D"
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
        }


    },
    mounted() {


        let layerlist = fetch('http://localhost:3000/dbInfo/getTables').then(res => res.json())
        console.log(layerlist)
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



        /*new itowns.Navigation(planarView, {
            position: 'bottom-left',
            translate: { y: 0 },
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
                //itownApi.addLayerToView(view, layer, {}, '#BBFFBB')
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
                                color: new itowns.THREE.Color("#ffffff"),
                                base_altitude: 1,
                                extrusion_height: setExtrusions,
                            }
                        })
                    });
                    view.addLayer(marne);
                })
            })

            transport.forEach(layer => {
                console.log(layer)
                //itownApi.addLayerToView(view, layer, { filters: [], columnFiltered: "" })
                fetch('http://localhost:3000/data/' + layer + '/selectData').then(res => res.json()).then(data => {
                    function setExtrusions(properties) {
                        return properties.hauteur;
                    }
                    let marne = new itowns.FeatureGeometryLayer(layer, {
                        // Use a FileSourccom_viewChangee to load a single file once
                        source: new itowns.FileSource({
                            fetchedData: data,
                            crs: 'EPSG:2154',
                            format: 'application/json',
                        }),
                        transparent: true,
                        opacity: 0.7,
                        style: new itowns.Style({
                            fill: {
                                color: new itowns.THREE.Color("#D5CABC"),
                                base_altitude: 1,
                                extrusion_height: setExtrusions,
                            }
                        })
                    });
                    view.addLayer(marne);
                })
            })


        })
        /*let paramsScen = { filters: this.getScen1, columnFiltered: "scenario" };
        itownApi.addLayerToView(view, "scenarios", paramsScen);*/

        /*let params = {
            patrim: {
                filters: ["Terrain de tennis", "Culte protestant", "Tribune", "Bâtiment industriel", "Tour, donjon, moulin", "Monument", "Autre", "Arc de triomphe", "Culte israélite", "Musée", "Culte divers", "Culte catholique ou o", "Chapelle", "Eglise"],
                color: new itowns.THREE.Color(0xffffff)
            },
            san: {
                filters: ["Centre de Jour pour Personnes Agées", "Foyer d'Accueil Médicalisé pour Adultes Handicapés (F.A.M.)", "Bureau d'Aide Psychologique Universitaire (B.A.P.U.)", "Institut Médico-Educatif (I.M.E.)", "Foyer Hébergement Adultes Handicapés", "Etablissement et Service d'Aide par le Travail (E.S.A.T.)", "Etablissement Expérimental pour Enfance Handicapée", "Service d'Aide aux Personnes Agées", "Centre de Pré orientation pour Handicapés", "Centre Médico-Psycho-Pédagogique (C.M.P.P.)", "Service d'Aide Ménagère à Domicile", "Etablissement pour Enfants ou Adolescents Polyhandicapés", "Service d'Éducation Spéciale et de Soins à Domicile", "Entreprise adaptée", "Maison de Retraite", "Etablissement d'Accueil Temporaire pour Personnes Agées", "Maison d'Accueil Spécialisée (M.A.S.)", "Institut pour Déficients Auditifs", "Centre Action Médico-Sociale Précoce (C.A.M.S.P.)", "Service d'Accompagnement à la Vie Sociale (S.A.V.S.)", "Foyer de Vie pour Adultes Handicapés", "Etablissement Expérimental pour Adultes Handicapés", "Institut Thérapeutique Éducatif et Pédagogique (I.T.E.P.)", "Logement Foyer"],
                color: new itowns.THREE.Color(0xffffff)
            },
            admin: {
                filters: ["Commerces", "Industrie", "Mairie", "Préfecture"],
                color: new itowns.THREE.Color(0xffffff)
            },
            autre: {
                filters: ["Autre enjeu sensible à la gestion de crise"],
                color: new itowns.THREE.Color(0xffffff)
            },
            def: {
                filters: ["Caserne de pompiers", "Gendarmerie/Commissariat", "Prison"],
                color: new itowns.THREE.Color(0xffffff)
            },
            ens: {
                filters: ["ECOLE GEN.ET TECHNOL.PRIVEE", "ECOLE PRIMAIRE PRIVEE", "LYCEE GEN. ET TECHNOL.PRIVE", "LYCEE TECHNOLOGIQUE", "SECTION ENSEIGT PROFES.PRIVEE", "ETAB.REGIONAL ENSEIGNT ADAPTE", "ECOLE MATERNELLE PRIVEE", "LYCEE GENERAL PRIVE", "LYCEE PRIVE POUR HANDICAPES", "LYCEE GENERAL", "ECOLE PRIMAIRE PUBLIQUE", "ECOLE PRIMAIRE", "LP LYCEE DES METIERS", "ECOLE PRIM.SPECIALISEE PRIVEE", "LYCEE GENERAL ET TECHNOLOGIQUE", "SECTION ENSEIGNT PROFESSIONNEL", "COLLEGE", "ECOLE 2D DEGRE PROF.PRIVEE", "ECOLE ELEMENTAIRE PUBLIQUE", "ECOLE ELEMENTAIRE APPLICATION PUBLIQUE", "ECOLE MATERNELLE PUBLIQUE", "LPO LYCEE DES METIERS", "ECOLE 2D DEGRE GENERAL PRIVEE", "COLLEGE PRIVE", "ECOLE ELEMENTAIRE PRIVEE", "ECOLE MATERNELLE D APPLICATION", "LYCEE PROFESSIONNEL"],
                color: new itowns.THREE.Color(0xffffff)
            },
            indus: {
                filters: ["Industrie", "Commerces", "Tourisme (camping)", "Autre enjeu sensible à la gestion de crise"],
                color: new itowns.THREE.Color(0xffffff)
            },
            trans_s: {
                filters: ["Gare", "Piste en dur", "Pont", "Bâtiment industriel"],
                color: new itowns.THREE.Color(0xffffff)
            }
        }

        itownApi.addEnjeuxToView(view, params);
        */


        let getProxy = (data) => {
            return JSON.parse(JSON.stringify(data))
        }

        $('.scen1').change((e) => {
            //$('#com_Itowns1').click()
            const value = e.target.value
            this.changeScene1(value)
            try {
                view.removeLayer('scenarios')
            } catch (err) {
                console.log(err)
            }

            const paramsScentest = { filters: getProxy(this.getScen1), columnFiltered: "scenario" };
            itownApi.addLayerToView(view, "scenarios", paramsScentest);

        })
        /*function setExtrusion(properties) {
            return properties.HAUTEUR;
        }*/
        /*function setColor() {
            return new itowns.THREE.Color(0xff0000);
        }*/

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

        async function travel(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, pathTravel);
        }
        console.log(travel)

        async function travel2d(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, Travel2D);
        }
        console.log(travel2d)

        async function travel3d(views) {
            return itowns.CameraUtils
                .sequenceAnimationsToLookAtTarget(views, views.camera.camera3D, Travel3D);
        }
        console.log(travel3d)
        view
            .addEventListener(itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED,
                function globeInitialized() {
                    // eslint-disable-next-line no-console
                    console.info('Globe initialized');

                    Promise.all(promises).then(function init() {
                        travel(view).then(travel).catch(console.error);

                        $('#com_viewChange').click(function () {
                            var clicks = $(this).data('clicks');
                            if (clicks) {
                                // odd clicks
                                travel3d(view).then(travel3d).catch(console.error);
                            } else {
                                // even clicks
                                travel2d(view).then(travel2d).catch(console.error);
                            }
                            $(this).data("clicks", !clicks);
                        });
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
                //itownApi.addLayerToView(view, layer, {}, '#BBFFBB')
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
                                color: new itowns.THREE.Color("#ffffff"),
                                base_altitude: 1,
                                extrusion_height: setExtrusions,
                            }
                        })
                    });
                    planarView.addLayer(marne);
                })
            })

            transport.forEach(layer => {
                console.log(layer)
                //itownApi.addLayerToView(view, layer, { filters: [], columnFiltered: "" })
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
                                color: new itowns.THREE.Color("#ffffff"),
                                base_altitude: 1,
                                extrusion_height: setExtrusions,
                            }
                        })
                    });
                    planarView.addLayer(marne);
                })
            })

        })

        /* let paramsScen2 = { filters: this.getScen2, columnFiltered: "scenario" };
         itownApi.addLayerToView(planarView, "scenarios", paramsScen2);*/



        /*let params2 = {
            patrim: {
                filters: ["Monument", "Culte catholique ou orthodoxe", null, "Tombeau", "Culte protestant", "Culte islamique", "Culte israélite", "Musée", "Culte divers"],
                color: new itowns.THREE.Color(0xffffff)
            },
            san: {
                filters: ["Autre enjeu sensible à la gestion de crise", "Maison de retraite", "Hôpital", "Industrie"],
                color: new itowns.THREE.Color(0xffffff)
            }
        }
        itownApi.addEnjeuxToView(planarView, params2);*/

        $('.scen2').change((e) => {
            // $('#com_Itowns2').click()
            const value = e.target.value
            this.changeScene2(value)
            try {
                planarView.removeLayer('scenarios')
            } catch (err) {
                console.log(err)
            }
            const paramsScentest = { filters: getProxy(this.getScen2), columnFiltered: "scenario" };
            itownApi.addLayerToView(planarView, "scenarios", paramsScentest);
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

#com_viewChange {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 48%;
    bottom: 12vh;
    border-radius: 100%;
}
</style>