<template>
    <div id="an_stats" class=" bg-dark">
        <div class="card" id="card1">
            <div class="card-body" v-if="infosScenario.proba != ''">
                <p class="card-text">
                <ul>
                    <li>{{ infosScenario.proba }} </li>
                    <li>{{ infosScenario.type }}</li>
                </ul>
                </p>
            </div>
            <div class="card-body" v-else>
                <p class="card-text">Sélectionnez un scénario
                </p>
            </div>
        </div>
        <div class="card" id="card2">
            <div class="card-body" v-if="infosPop.totalEleves != null">
                <p class="card-text" v-if="infosPop.totalEleves == 0">Aucune donnée de capacité d'accueil disponible</p>
                <p class="card-text" v-else>{{ infosPop.elevesImpact }} élève(s) impacté(s) sur {{ infosPop.totalEleves }}
                    sélectionnés
                    <br> soit {{ infosPop.pourcentageEleves }}%
                </p>
            </div>
            <div class="card-body" v-else>
                <p class="card-text">Sélectionnez des enjeux d'enseignement
                </p>
            </div>
        </div>
        <div class="card" id="card3">
            <div class="card-body" v-if="infosPop.totalPopSante != null">
                <p class="card-text" v-if="infosPop.totalPopSante == 0">Aucune donnée de capacité d'accueil disponible</p>
                <p class="card-text" v-else>{{ infosPop.popSanteImpact }} patient(s) impacté(s) sur {{
                    infosPop.totalPopSante }}
                    sélectionnés
                    <br> soit {{ infosPop.pourcentageSante }}%
                </p>

            </div>
            <div class="card-body" v-else>
                <p class="card-text">Sélectionnez des enjeux de santé
                </p>
            </div>
        </div>
        <button id="an_bouton" type="button" class="btn btn-outline-success  " v-on:click="btnEnregistrer">Enregistrer la
            vue</button>
        <a id="an_bouton2" href="/TRIvial"> <button class="btn btn-outline-success">
                <!-- <img src="../../assets/menu(1).png" width="50"
                    height="50" /> -->
                MENU
            </button></a>

    </div>
</template>

<script>
import { THREE } from '../../../node_modules/itowns/dist/itowns';
import api2stats from '../../js/api2stats'
//import the store
import { store } from '../Store.js';

export default {
    name: "AnStats",
    data() {
        return {
            store,
            infosScenario: {
                proba: "",
                type: ""
            },
            infosPop: {
                totalEleves: null,
                elevesImpact: 0,
                pourcentageEleves: 0,
                totalPopSante: null,
                popSanteImpact: 0,
                pourcentageSante: 0,
            }
        }
    },
    mounted() {
        let bouton_valider = document.getElementById("validate");
        bouton_valider.addEventListener("click", () => {
            api2stats.scenarioType().then((infos) => {
                this.infosScenario.type = infos[0];
            })

            api2stats.scenarioProba(this.store.num_scenario).then((infos) => {
                this.infosScenario.proba = infos
            })

            let params = JSON.parse(JSON.stringify(this.store.params));
            if (Object.keys(params).includes('ens')) {
                api2stats.getNbEleves(params['ens'], this.store.prob_scenario).then((infos) => {
                    this.infosPop.totalEleves = infos[0]
                    this.infosPop.elevesImpact = infos[1]
                    this.infosPop.pourcentageEleves = infos[2]
                })
            }
            if (Object.keys(params).includes('san')) {
                api2stats.getNbPopSante(params['san'], this.store.prob_scenario).then((infos) => {
                    this.infosPop.totalPopSante = infos[0]
                    this.infosPop.popSanteImpact = infos[1]
                    this.infosPop.pourcentageSante = infos[2]
                })
            }

        })

    },
    methods: {
        btnEnregistrer() {
            if (confirm("Voulez-vous enregistrer cette vue (sélection de paramètres) ?")) {
                let types = document.querySelectorAll("#type");
                let params = {};
                let filters = new Map();
                for (var i = 0; i < types.length; i++) {
                    if (types[i].checked) {
                        let enjeu = types[i].value;
                        let input_enjeu = document.querySelector("#" + enjeu);
                        if (input_enjeu.checked) {
                            if (filters.has(input_enjeu.id)) {
                                filters[input_enjeu.id] = filters.get(input_enjeu.id).push(types[i].nextSibling.innerText);

                            } else {
                                filters.set(input_enjeu.id, [types[i].nextSibling.innerText]);
                            }
                        }
                        if (document.querySelector("#autre").checked) {
                            filters.set("autre", []);
                        }
                    }
                }
                filters.forEach((tab_types, enjeu) => {
                    params[enjeu] = { filters: tab_types, color: new THREE.Color(0xffffff) };
                })
                fetch('http://localhost:3000/saveDownParams', {
                    body: JSON.stringify({ params: params }),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'post'
                }).then(res => res.json())
            }
        }
    }
}
</script>

<style>
#an_stats {
    position: absolute;
    bottom: 0;
    height: 10vh;
    z-index: 1000000;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 25%);

}

#an_bouton {
    position: absolute;
    right: 8%;
    bottom: 2vh;
    margin: auto;
    width: 15%;
    height: 50px;
}

#an_bouton2 {
    position: absolute;
    right: 0.5%;
    bottom: 2vh;
    margin: auto;
    /* width: 15%; */
}

#an_bouton2 button {
    height: 50px;
}

#an_bouton2 button {
    width: 100%;
}

.card {
    margin: 2%;
    padding: 0;
}

.card-text {
    text-align: center;
    font-size: 13px;
}
</style>