<template>
    <div id="an_stats" class=" bg-dark">
        <div class="card" id="card1">
            <div class="card-body">
                <p class="card-text">{{ infosScenario.proba }} {{ infosScenario.type }}
                </p>
            </div>
        </div>
        <div class="card" id="card2">
            <div class="card-body">
                <p class="card-text">{{ infosPop.elevesImpact }} / {{ infosPop.totalEleves }}
                </p>
                <p>{{ infosPop.pourcentage }}%</p>
            </div>
        </div>
        <div class="card" id="card3">
            <div class="card-body">
                <p class="card-text">3ème statistique
                </p>
            </div>
        </div>
        <button id="an_bouton" type="button" class="btn btn-outline-success  " v-on:click="btnEnregistrer">Enregister la
            vue</button>
        <div id="an_bouton2"><a href="/TRIVial/Comparaisons"><button type="button"
                    class="btn btn-outline-success  ">Comparer
                    Scenarios</button></a></div>
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
                totalEleves: 0,
                elevesImpact: 0,
                pourcentage: 0
            }
        }
    },
    mounted() {
        let bouton_valider = document.getElementById("validate");
        bouton_valider.addEventListener("click", () => {
            this.infosScenario.proba = this.store.scenario;
            api2stats.scenarioInfoStat().then((infos) => {
                this.infosScenario.type = infos[0];
            })
            let params = JSON.parse(JSON.stringify(this.store.params));
            if (Object.keys(params).includes('ens')) {
                api2stats.getNbEleves(params['ens'], this.infosScenario.proba).then((infos) => {
                    this.infosPop.totalEleves = infos[0]
                    this.infosPop.elevesImpact = infos[1]
                    this.infosPop.pourcentage = infos[2]
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
    right: 5%;
    bottom: 5vh;
    margin: auto;
    width: 15%;
}

#an_bouton2 {
    position: absolute;
    right: 5%;
    bottom: 0vh;
    margin: auto;
    width: 15%;
}

#an_bouton2 button {
    width: 100%;
}

.card {
    margin: 2%;
}

.card-text {
    text-align: center;

}
</style>