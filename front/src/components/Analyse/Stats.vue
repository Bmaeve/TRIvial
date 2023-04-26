<template>
    <!-- Html code to display statistics -->
    <div id="an_stats" class=" bg-dark">
        <div class="card" id="card1">
            <div class="card-body" v-if="infosScenario.proba != ''">
                <p class="card-text">
                <ul>
                    <li>{{ infosScenario.proba }} - {{ infosScenario.textProba }}</li>
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
                MENU
            </button></a>

    </div>
</template>

<script>
import api2stats from '../../js/api2stats'
import accessParams from '../../js/getParams'
//import the store
import { store } from '../Store.js';

let probasScenarios = {
    1: "Décennale",
    2: "Centennale",
    3: "Millennale"
}

export default {
    name: "AnStats",
    data() {
        return {
            store,
            infosScenario: {
                proba: "",
                type: "",
                textProba: "",
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
        //Retrieving statistics' informations when the button is clicked on
        let bouton_valider = document.getElementById("validate");
        bouton_valider.addEventListener("click", () => {
            this.infosPop.totalEleves = null;
            this.infosPop.totalPopSante = null;
            api2stats.scenarioType().then((infos) => {
                this.infosScenario.type = infos[0];
                this.infosScenario.type = this.infosScenario.type.replace(this.infosScenario.type[0], this.infosScenario.type[0].toUpperCase());
            })

            api2stats.scenarioProba(this.store.num_scenario).then((infos) => {
                this.infosScenario.proba = infos;
                if (this.infosScenario.proba.includes("forte")) {
                    this.infosScenario.textProba = probasScenarios[1];
                } else if (this.infosScenario.proba.includes("moyenne")) {
                    this.infosScenario.textProba = probasScenarios[2];
                } else if (this.infosScenario.proba.includes("faible")) {
                    this.infosScenario.textProba = probasScenarios[3];
                }
            })

            let params = JSON.parse(JSON.stringify(this.store.params));
            if (Object.keys(params).includes('ens')) {
                api2stats.getNbEleves(params['ens'], this.store.prob_scenario).then((infos) => {
                    this.infosPop.totalEleves = infos[0];
                    this.infosPop.elevesImpact = infos[1];
                    this.infosPop.pourcentageEleves = infos[2];
                })
            }
            if (Object.keys(params).includes('san')) {
                api2stats.getNbPopSante(params['san'], this.store.prob_scenario).then((infos) => {
                    this.infosPop.totalPopSante = infos[0];
                    this.infosPop.popSanteImpact = infos[1];
                    this.infosPop.pourcentageSante = infos[2];
                })
            }

        })

    },
    methods: {
        //Function to register a view in json format
        btnEnregistrer() {
            if (confirm("Voulez-vous enregistrer cette vue (sélection de paramètres) ? \
            Afin d'utiliser le calcul d'itinéraire de manière optimale, nous conseillons de n'enregistrer que la couche des enjeux vers lequels vous voulez connaître les itinéraires !")) {
                let fileName = prompt('Nommez votre fichier : ', "parameters");

                let params = accessParams.getParams();
                fetch('http://localhost:3000/saveDownParams', {
                    body: JSON.stringify({ name: fileName, params: params }),
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
}

#an_bouton2 button {
    height: 50px;
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