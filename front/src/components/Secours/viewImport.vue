<template>
    <!-- Decision view list -->
    <div class="sec_vue_save">
        <span>Importer une vue enregistrée</span>
        <!-- Decision view select list -->
        <select class="form-select" size="3" aria-label="size 3 select example">
            <!--<option v-for="item in plans" :value="item.id" :key="item.id">{{ item.title }}</option>-->
        </select>
        <br>
        <!-- Decision view import button -->
        <div class="d-grid gap-2 col-12 mx-auto">
            <button class="btn btn-info" type="button" id="importButton" v-on:click="btnImporter">Importer</button>
        </div>

    </div>
</template>
<script>
//import the store
import { store } from '../Store.js';

//component export
export default {
    name: 'sec_viewImporte',
    props: {

    },
    data() {
        return {
            //decision view list
            plans: [{
                "id": 0,
                "title": "Pas de plans"
            }],
            store
        }
    }, mounted() {
        fetch('http://localhost:3000/saveDownParams/filenames')
            .then(res => res.json())
            .then(r => {
                let items = document.getElementsByClassName("form-select")[0];
                for (let i = 0; i < r.data.length; i++) {
                    var e = document.createElement("option");
                    e.value = i.toString();
                    e.innerText = r.data[i].substr(0, r.data[i].length - 5);
                    items.appendChild(e);
                }
            })
    }, methods: {
        btnImporter() {
            let items = document.getElementsByClassName("form-select")[0].children;
            let bool = true;
            let name;
            let i = 0;
            while (i < items.length && bool) {
                if (items[i].selected) {
                    bool = false;
                    name = items[i].innerText;
                }
                i++;
            }
            this.$emit("import", name);
        }
    }
}
</script>
<style>
/* Decision view list */
.sec_vue_save {
    height: 25vh;
    overflow-y: auto;
}
</style>