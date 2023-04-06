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
            <button class="btn btn-info" type="button" v-on:click="btnImporter">Importer</button>
        </div>

    </div>
</template>
<script>
//component exporte
export default {
    name: 'sec_viewImporte',
    props: {

    },
    data() {
        return {
            //decision view list
            plans: [{
                "id": 1,
                "title": "Plan 1",
                "Script": {
                    "sql": "select * from A"
                }
            },
            {
                "id": 2,
                "title": "Plan 2",
                "Script": {
                    "sql": "select * from A"
                }
            },
            {
                "id": 3,
                "title": "Plan 3",
                "Script": {
                    "sql": "select * from A"
                }
            },
            {
                "id": 4,
                "title": "Plan 4",
                "Script": {
                    "sql": "select * from A"
                }
            }
            ]
        }
    }, mounted() {
        fetch('http://localhost:3000/importParams/name', {
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        }).then(res => res.json()).then(r => {
            let items = document.getElementsByClassName("form-select")[0];
            for (let i = 0; i < r.data.length; i++) {
                var e = document.createElement("option");
                e.value = i.toString();
                e.innerText = r.data[i].substr(11, 20);
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
            fetch('http://localhost:3000/importParams/data', {
                body: JSON.stringify({ texte: "parameters/" + name }),
                headers: { 'Content-Type': 'application/json' },
                method: 'post'
            }).then(res => res.json()).then(r => {
                console.log(r.data[0]);
                //Appel à la fonction d'affichage :
                //api2itowns.addEnjeuxToView(view, r.data);
            })
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