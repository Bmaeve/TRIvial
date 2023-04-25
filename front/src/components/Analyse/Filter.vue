<template>
    <div id="form" class="an_select_form">
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

            <li class="nav-item">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Scénario</span>
                <input v-model="rangeValue" type="range" class="form-range" min="1" max="3" step="1" id="rangeScenario">
                <span>{{ rangeValueText }}</span>
            </li>

            <li class="MultiRangeSliderContainer">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Hauteur des bâtiments</span>
                <MultiRangeSlider baseClassName="multi-range-slider" :min="0" :max="300" :step="20" :ruler="true"
                    :label="true" :minValue="barMinValue" :maxValue="barMaxValue" @input="UpdateValues" />
                <span style="float:left;font-size: 0.8em;">Min:{{ barMinValue }}</span> <span
                    style="float:right;font-size: 0.8em;">Max:{{ barMaxValue }}</span>
            </li>
            <li class="nav-item">

                <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Enjeux</span>
                <div>
                    <div :id="enjeu.id_parent" class="form-check enjeuxContainer" v-for="enjeu in enjeux" :key="enjeu.id"
                        :data-bs-target="enjeu.target_collapse">
                        <input class="form-check-input form-enjeu" type="checkbox" :id="enjeu.id" v-model="enjeu.value">
                        <label class="form-check-label" :for="enjeu.id">
                            {{ enjeu.text }}
                        </label>
                        <input type="color" class="color" :id="enjeu.id_color" value="#6ACE3C">
                        <div v-if="enjeu.value">
                            <div v-for="typeEnjeu in types_enjeux" :key="typeEnjeu.enjeu">
                                <div v-if="typeEnjeu.enjeu == enjeu.id">
                                    <div v-for="tab in typeEnjeu.types" :key="tab.id">

                                        <div class="form-check" :id="enjeu.id_collapse">
                                            <input class="form-check-input" type="checkbox" :value="tab.value" :id="tab.id"
                                                checked>
                                            <label class="form-check-label" :for="tab.id">
                                                {{ tab.text }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="validateContainer">
                        <button class="btn btn-success" id="validate" v-on:click="btnValidate" type="submit"
                            :disabled="btnIsDisabled">Valider</button>
                        <div :class="{ invisible: !btnIsDisabled }" id="loader"></div>
                    </div>

                </div>
            </li>
        </ul>
    </div>
</template>
<script>

import MultiRangeSlider from 'multi-range-slider-vue'
import "../../../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";
import "../../../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";
import accessParams from '../../js/getParams'

//import the store
import { store } from '../Store.js';

let idx2Scenario = {
    1: "01For",
    2: "02Moy",
    3: "04Fai"
}

let text2Scenario = {
    1: "Forte",
    2: "Moyenne",
    3: "Faible"
}

export default {
    name: "FilterSelection",
    components: {
        MultiRangeSlider,
    },
    props: ['buttonDisable'],
    data() {
        return {
            rangeValue: 1,
            enjeux: [
                { text: "Enjeu 1", value: false, id: "check1", target_collapse: "#collapse1", id_collapse: "collapse1", id_parent: "parent1", id_color: "color1" },
                { text: "Enjeu 2", value: false, id: "check2", target_collapse: "#collapse2", id_collapse: "collapse2", id_parent: "parent2", id_color: "color1" },
                { text: "Enjeu 3", value: false, id: "check3", target_collapse: "#collapse3", id_collapse: "collapse3", id_parent: "parent3", id_color: "color1" },
                { text: "Enjeu 4", value: false, id: "check4", target_collapse: "#collapse4", id_collapse: "collapse4", id_parent: "parent4", id_color: "color1" },
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
        //Callback function to sort the arrays
        const sorter = (sortBy) => (a, b) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
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
                        id_parent: "parent_" + enjeu.key,
                        id_color: "color_" + enjeu.key
                    });
                })
                this.enjeux = new_enjeux;
                this.enjeux.sort(sorter('text'));

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
                                            if (enjeu_name == "ens") {
                                                el = el.toLowerCase()
                                                el = el.replace(el[0], el[0].toUpperCase())
                                            }
                                            list.push({ text: el, value: enjeu_name, id: "type" })
                                        } else {
                                            list.push({ text: "null", value: enjeu_name, id: "type" })
                                        }
                                    });
                                    list.sort(sorter("text"))
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
            return "Probabilité " + text2Scenario[this.rangeValue];
        },
        btnIsDisabled: function () {
            return this.buttonDisable;
        }
    },
    methods: {
        btnValidate() {
            let params = accessParams.getParams();
            //storing necessary values for statistics
            this.store.params = params;
            this.store.prob_scenario = idx2Scenario[this.rangeValue]
            this.store.num_scenario = this.rangeValue;
            // return parameters to parent
            this.$emit("validate", params);
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

.validateContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

#loader {
    border: 6px solid #f3f3f3;
    /* Light grey */
    border-top: 6px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 3vw;
    height: 3vw;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.invisible {
    visibility: hidden;
}

.color {
    height: 15px;
    width: 25px;
    padding: 0;
    margin: 0;
    border: 0.2vw;
}

.form-check-label {
    padding-left: 1vw;
    padding-right: 1vw;
}
</style>
