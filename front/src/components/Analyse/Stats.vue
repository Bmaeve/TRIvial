<template>
    <div id="an_stats" class=" bg-dark">
        <div class="card" id="card1">
            <div class="card-body">
                <p class="card-text">1ère statistique
                </p>
            </div>
        </div>
        <div class="card" id="card2">
            <div class="card-body">
                <p class="card-text">2ème statistique
                </p>
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
        <a href="/TRIVial/Comparaisons"><button id="an_bouton2" type="button" class="btn btn-outline-success  ">Comparer
                Scenarios</button></a>
    </div>
</template>

<script>
import { THREE } from '../../../node_modules/itowns/dist/itowns';



export default {
    name: "AnStats",
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

.card {
    margin: 2%;
}

.card-text {
    text-align: center;

}
</style>