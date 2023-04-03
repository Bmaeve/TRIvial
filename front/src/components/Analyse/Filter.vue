<template>
    <div id="form" class="an_select_form">
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

            <li class="nav-item">
                <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Scénario</span>
                <input v-on:change="rangeChange" type="range" class="form-range" min="1" max="3" step="1"
                    id="rangeScenario">
                <span>{{ rangeValue }}</span>
            </li>
            <li>
                <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Enjeux</span>

                <div :id="enjeu.id_parent" class="form-check" v-for="enjeu in enjeux" :key="enjeu.id"
                    :data-bs-target="enjeu.target_collapse">
                    <input class="form-check-input" type="checkbox" :value="enjeu.value" :id="enjeu.id"
                        v-on:change="Collapse">
                    <label class="form-check-label" :for="enjeu.id">
                        {{ enjeu.text }}
                    </label>
                    <div v-for="typeEnjeu in types_enjeux" :key="typeEnjeu.enjeu">
                        <div v-if="typeEnjeu.enjeu == enjeu.value">
                            <div class="form-check collapse " :id="enjeu.id_collapse" v-for="tabType in typeEnjeu.types"
                                :key="tabType.id">
                                <input class="form-check-input" type="checkbox" :value="tabType.value"
                                    :id="enjeu.id_collapse">
                                <label class="form-check-label" :for="tabType.id">
                                    {{ tabType.text }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success" type="submit">Valider</button>

            </li>
        </ul>
    </div>
</template>
<script>


export default {
    name: "FilterSelection",
    props: {

    },
    data() {
        return {
            value: null,
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

            }
        }

    }, async created() {

        let new_enjeux = [];
        let res = await fetch("http://localhost:3000/enjeux/getTypesEnjeux");
        let data_fetched = await res.json();

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
        console.log(this.enjeux);

        let types = [];

        //types enjeux
        data_fetched.forEach((enjeu) => {
            let types_fetched = [];
            for (let i = 0; i < enjeu.columns.length; i++) {
                let column = enjeu.columns[i];
                if (column.column_name != "hauteur") {
                    types_fetched.push({ text: column.column_name, value: i, id: "type_" + enjeu.key + "_" + i })
                }
            }
            types.push({ enjeu: enjeu.key, types: types_fetched });
        })

        console.log(types);
        console.log(types[0]);
        this.types_enjeux = types;
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
        },
        Collapse(e) {
            e.preventDefault();
            console.log(e.target.value);
            let children = document.querySelectorAll("#collapse_" + e.target.value);
            console.log(children);

            children.forEach(child => {
                child.classList.toggle('show');
            });

        }
    }

}
</script>
<style></style>