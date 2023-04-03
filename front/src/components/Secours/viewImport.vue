<template>
    <!-- Decision view list -->
    <div class="sec_vue_save">
        <span>Importer une vue enregistrée</span>
        <!-- Decision view select list -->
        <select class="form-select" size="3" aria-label="size 3 select example">
            <option v-for="item in plans" :value="item.id" :key="item.id">{{ item.title }}</option>
        </select>
        <br>
        <!-- Decision view import button -->
        <div class="d-grid gap-2 col-12 mx-auto">
            <button class="btn btn-info" type="button">Importer</button>
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