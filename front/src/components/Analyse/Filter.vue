<template>
    <div id="form" class="an_select_form">
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

            <li class="nav-item">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Scénario</span>
                <input v-model="rangeValue" type="range" class="form-range" min="1" max="3" step="1" id="rangeScenario">
                <span>{{ rangeValueText }}</span>
            </li>

            <li class="MultiRangeSliderContainer">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Hauteur de bâtiment</span>
                <MultiRangeSlider baseClassName="multi-range-slider" :min="0" :max="300" :step="20" :ruler="true"
                    :label="true" :minValue="barMinValue" :maxValue="barMaxValue" @input="UpdateValues" />
                <span style="float:left;font-size: 0.8em;">Min:{{ barMinValue }}</span> <span
                    style="float:right;font-size: 0.8em;">Max:{{ barMaxValue }}</span>
            </li>
            <li class="nav-item">

                <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Enjeux</span>
                <div>
                    <div :id="enjeu.id_parent" class="form-check" v-for="enjeu in enjeux" :key="enjeu.id"
                        :data-bs-target="enjeu.target_collapse">
                        <input class="form-check-input" type="checkbox" :id="enjeu.id" v-model="enjeu.value">
                        <label class="form-check-label" :for="enjeu.id">
                            {{ enjeu.text }}
                        </label>
                        <div v-if="enjeu.value">
                            <div v-for="typeEnjeu in types_enjeux" :key="typeEnjeu.enjeu">
                                <div v-if="typeEnjeu.enjeu == enjeu.id">
                                    <div v-for="tab in typeEnjeu.types" :key="tab.id">

                                        <div class="form-check" :id="enjeu.id_collapse">
                                            <input class="form-check-input" type="checkbox" :value="tab.value" :id="tab.id">
                                            <label class="form-check-label" :for="tab.id">
                                                {{ tab.text }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success" id="validate" v-on:click="btnValidate" type="submit">Valider</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

import MultiRangeSlider from 'multi-range-slider-vue'
import "../../../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";

import "../../../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";

import { THREE } from '../../../node_modules/itowns/dist/itowns';


//import the store
import { store } from '../Store.js';

let idx2Scenario = {
    1: "01For",
    2: "02Moy",
    3: "04Fai"
}

export default {
    name: "FilterSelection",
    components: {
        MultiRangeSlider,
    },

    data() {
        return {
            rangeValue: 1,
            enjeux: [
                { text: "Enjeu 1", value: false, id: "check1", target_collapse: "#collapse1", id_collapse: "collapse1", id_parent: "parent1" },
                { text: "Enjeu 2", value: false, id: "check2", target_collapse: "#collapse2", id_collapse: "collapse2", id_parent: "parent2" },
                { text: "Enjeu 3", value: false, id: "check3", target_collapse: "#collapse3", id_collapse: "collapse3", id_parent: "parent3" },
                { text: "Enjeu 4", value: false, id: "check4", target_collapse: "#collapse4", id_collapse: "collapse4", id_parent: "parent4" },
            ],
            types_enjeux: [
                { text: "Type 1", value: 1, id: "type1" },
                { text: "Type 2", value: 2, id: "type2" },
                { text: "Type 3", value: 3, id: "type3" },
            ],
            infos_json: {

            },
            barMinValue: 0,
            barMaxValue: 300,
            store
        }

    },
    created() {
        let new_enjeux = [];

        let types = [];
        fetch("http://localhost:3000/enjeux/getTypesEnjeux")
            .then((res) => {
                return res.json()
            }).then((data_fetched) => {
                //enjeux
                data_fetched.forEach((enjeu) => {
                    new_enjeux.push({
                        text: enjeu.fullName,
                        value: false,
                        id: enjeu.key,
                        target_collapse: "#collapse_" + enjeu.key,
                        id_collapse: "collapse_" + enjeu.key,
                        id_parent: "parent_" + enjeu.key
                    });
                })
                this.enjeux = new_enjeux;

                //types enjeux
                data_fetched.forEach((enjeu) => {
                    let enjeu_name = enjeu.key;
                    for (let i = 0; i < enjeu.columns.length; i++) {
                        let column_name = enjeu.columns[i].column_name;
                        if (column_name != "hauteur") {
                            let list = [];
                            fetch("http://localhost:3000/dbInfo/" + enjeu_name + "/" + column_name + "/getDistinctValues")
                                .then((res) => {
                                    return res.json();
                                })
                                .then((data) => {
                                    data.forEach(el => {
                                        if (el != null) {
                                            list.push({ text: el, value: enjeu_name, id: "type" })
                                        }
                                    });
                                    types.push({ enjeu: enjeu_name, types: list });
                                })
                        }
                    }
                })
                this.types_enjeux = types;
            })


    },
    computed: {
        rangeValueText() {
            this.$emit('scenarioChanged', idx2Scenario[this.rangeValue]);
            return "Probabilité" + idx2Scenario[this.rangeValue];
        }
    },
    methods: {

        btnValidate() {
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
                }
            }
            if (document.querySelector("#autre").checked) {
                filters.set("autre", []);
            }
            filters.forEach((tab_types, enjeu) => {
                params[enjeu] = {
                    filters: tab_types,
                    color: new THREE.Color(0xffffff),
                    concernedByScenario: idx2Scenario[this.rangeValue]
                };
            })
            this.store.params = params;
        },

        UpdateValues(e) {
            this.barMinValue = e.minValue;
            this.barMaxValue = e.maxValue;
        }
    },
}


</script>
<style>
.MultiRangeSliderContainer {
    margin: auto;
    width: 100%;
    padding-right: 10px;
}

li {
    size-adjust: initial;
    resize: inherit;
}
</style>