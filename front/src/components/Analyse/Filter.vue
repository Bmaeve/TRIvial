<template>
    <div id="form" class="an_select_form">
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

            <li class="nav-item">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Scénario</span>
                <input v-on:change="rangeChange" type="range" class="form-range" min="1" max="3" step="1"
                    id="rangeScenario">
                <span>{{ rangeValue }}</span>
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
                        <input class="form-check-input" type="checkbox" :value="enjeu.value" :id="enjeu.id"
                            v-on:change="Collapse">
                        <label class="form-check-label" :for="enjeu.id">
                            {{ enjeu.text }}
                        </label>
                        <div v-for="typeEnjeu in types_enjeux" :key="typeEnjeu.enjeu">
                            <div v-if="typeEnjeu.enjeu == enjeu.value">
                                <div v-for="tab in typeEnjeu.types" :key="tab.id">
                                    <div class="form-check collapse " :id="enjeu.id_collapse">
                                        <input class="form-check-input" type="checkbox" :value="tab.value"
                                            :id="enjeu.id_collapse">
                                        <label class="form-check-label" :for="tab.id">
                                            {{ tab.text }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <button class="btn btn-success" v-on:click="btnValidate" type="submit">Valider</button>
                </div>

            </li>
        </ul>
    </div>
</template>
<script>

import $ from 'jquery'
import MultiRangeSlider from 'multi-range-slider-vue'
import "../../../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";

import "../../../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";

console.log($)


export default {
    name: "FilterSelection",
    components: {
        MultiRangeSlider
    },

    data() {
        return {
            rangeValue: "Fort",
            enjeux: [
                { text: "Enjeu 1", value: 1, id: "check1", target_collapse: "#collapse1", id_collapse: "collapse1", id_parent: "parent1" },
                { text: "Enjeu 2", value: 2, id: "check2", target_collapse: "#collapse2", id_collapse: "collapse2", id_parent: "parent2" },
                { text: "Enjeu 3", value: 3, id: "check3", target_collapse: "#collapse3", id_collapse: "collapse3", id_parent: "parent3" },
                { text: "Enjeu 4", value: 4, id: "check4", target_collapse: "#collapse4", id_collapse: "collapse4", id_parent: "parent4" },
            ],
            types_enjeux: [
                { text: "Type 1", value: 1, id: "type1" },
                { text: "Type 2", value: 2, id: "type2" },
                { text: "Type 3", value: 3, id: "type3" },
            ],
            infos_json: {

            },
            barMinValue: 0,
            barMaxValue: 300
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
                        value: enjeu.key,
                        id: "check_" + enjeu.key,
                        target_collapse: "#collapse_" + enjeu.key,
                        id_collapse: "collapse_" + enjeu.key,
                        id_parent: "parent_" + enjeu.key
                    });
                })

                this.enjeux = new_enjeux;

                //types enjeux
                data_fetched.forEach((enjeu) => {
                    let enjeu_name = enjeu.key;
                    // let types_fetched = [];
                    for (let i = 0; i < enjeu.columns.length; i++) {
                        let column_name = enjeu.columns[i].column_name;
                        if (column_name != "hauteur") {
                            let list = [];
                            //    types_fetched.push({ text: column.column_name, value: i, id: "type_" + enjeu.key + "_" + i })
                            fetch("http://localhost:3000/dbInfo/" + enjeu_name + "/" + column_name + "/getDistinctValues")
                                .then((res) => {
                                    return res.json();
                                })
                                .then((data) => {
                                    let j = 0;
                                    data.forEach(el => {
                                        j++;
                                        if (el != null) {
                                            list.push({ text: el, value: j, id: "type_" + enjeu.key + "_" + j })
                                        }
                                    });
                                    // console.log(list);
                                    types.push({ enjeu: enjeu_name, types: list });
                                })
                        }
                    }
                })

                this.types_enjeux = types;
            })


    },
    methods: {
        rangeChange(e) {
            let range = e.target;
            if (range.value == 1) {
                this.rangeValue = "Faible";
            }
            else if (range.value == 2) {
                this.rangeValue = "Moyen";
            }
            else if (range.value == 3) {
                this.rangeValue = "Fort";
            }
        },
        Collapse(e) {
            e.preventDefault();
            console.log(e.target.value);
            let children = document.querySelectorAll("#collapse_" + e.target.value);
            console.log(children);
            children.forEach(child => {
                child.classList.toggle('show');
            });

        },

        btnValidate() {
            let enjeux = document.querySelectorAll("div.form-check");
            let params = {};
            for (var i = 0; i < enjeux.length; i++) {
                let filters = [];
                if (enjeux[i].getAttribute('id').indexOf("parent") == 0 && enjeux[i].firstElementChild.checked) {
                    enjeux[i].childNodes.forEach(type => {
                        if (type.className == "form-check collapse show" && type.firstChild.checked) {
                            filters.push(type.innerText);
                        }
                    });
                    let enjeuName = enjeux[i].innerHTML.slice(115, 115 + enjeux[i].innerHTML.slice(115, 150).indexOf("/") - 1);
                    params[enjeuName] = {};
                    params[enjeuName].filters = filters;
                }
            }
            console.log(params);
            //api2itowns.addLayerToView(view, params, body);
        },

        UpdateValues(e) {
            this.barMinValue = e.minValue;
            this.barMaxValue = e.maxValue;
        }
    },
    mounted() {
        $('#viewerDiv').click(() => {
            console.log(this.barMinValue, this.barMaxValue)
        })
    }
}

</script>
<style>
.MultiRangeSliderContainer {
    margin: auto;
    width: 100%;
    padding-right: 10px;
}
</style>