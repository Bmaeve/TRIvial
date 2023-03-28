<template>
    <div id="an_selection">
        <div class="col-auto  bg-dark">

            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">TRIvial - Analyse</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Scénario</span>
                        <input v-on:change="rangeChange" type="range" class="form-range" min="1" max="3" step="1"
                            id="rangeScenario">
                        <span>{{ rangeValue }}</span>
                    </li>
                    <li><i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Enjeux</span>
                        <div class="form-check" v-for="enjeu in enjeux" :key="enjeu.id" data-bs-toggle="collapse"
                            :data-bs-target="enjeu.target_collapse">
                            <input class="form-check-input" type="checkbox" :value="enjeu.value" :id="enjeu.id">
                            <label class="form-check-label" :for="enjeu.id">
                                {{ enjeu.text }}
                            </label>
                            <div class="collapse" :id="enjeu.id_collapse" data-bs-parent="#menu">
                                <div class="form-check" v-for="typeEnjeu in types_enjeux" :key="typeEnjeu.id">
                                    <input class="form-check-input" type="checkbox" :value="typeEnjeu.value"
                                        :id="typeEnjeu.id">
                                    <label class="form-check-label" :for="typeEnjeu.id">
                                        {{ typeEnjeu.text }}
                                    </label>
                                </div>
                            </div>
                        </div>


                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "AnSelection",
    data() {
        return {
            rangeValue: "Fort",
            enjeux: [
                { text: "Enjeu 1", value: 1, id: "check1", target_collapse: "#collapse1", id_collapse: "collapse1" },
                { text: "Enjeu 2", value: 2, id: "check2", target_collapse: "#collapse2", id_collapse: "collapse2" },
                { text: "Enjeu 3", value: 3, id: "check3", target_collapse: "#collapse3", id_collapse: "collapse3" },
                { text: "Enjeu 4", value: 4, id: "check4", target_collapse: "#collapse4", id_collapse: "collapse4" },
            ],
            types_enjeux: [
                { text: "Type 1", value: 1, id: "type1" },
                { text: "Type 2", value: 2, id: "type2" },
                { text: "Type 3", value: 3, id: "type3" },
            ]
        }
    },
    methods: {
        rangeChange() {
            let range = document.getElementById("rangeScenario");
            if (range.value == 1) {
                this.rangeValue = "Faible";
            }
            else if (range.value == 2) {
                this.rangeValue = "Moyen";
            }
            else if (range.value == 3) {
                this.rangeValue = "Fort";
            }
        }
    }
}
</script>

<style>
#an_selection {
    grid-area: auto;
}
</style>