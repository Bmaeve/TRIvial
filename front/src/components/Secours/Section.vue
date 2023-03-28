<template>
    <div id="sec_section" class="container">
        <div class="sec_info_title">
            <h4>TRIvial - Secours</h4>
        </div>

        <div class="sec_vue_save">
            <span>Importer une vue enregistrée</span>
            <select class="form-select" size="3" aria-label="size 3 select example">
                <option selected>Plan 1</option>
                <option value="1">Plan 2</option>
                <option value="2">Plan 3</option>
                <option value="3">Plan 4</option>
            </select>
            <br>
            <div class="d-grid gap-2 col-12 mx-auto">
                <button class="btn btn-primary" type="button">Importer</button>
            </div>



        </div>
        <br>
        <div class="sec_info_enjeux">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Properties</th>
                        <th scope="col">value</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(properties, key) in featureKeys" :key='key'>
                        <tr>
                            <th>{{ properties }}</th>
                            <td>{{ featureInfo[0][properties] }}</td>
                        </tr>

                    </template>
                </tbody>
            </table>
        </div>
        <div class="sec_calcul_itin">

        </div>
    </div>
</template>

<script>
import $ from 'jquery'

console.log($)
const featureInfo = [{
    "id": 1,
    "name": "Sentier",
    "hauteur": 15,
    "code": "A231"
}]

const listKeys = Object.keys(featureInfo[0])
export default {
    name: 'sec_Section',
    props: {

    },
    data() {
        return {
            featureInfo: featureInfo,
            featureKeys: listKeys
        }
    }

}

</script>

<style>
#sec_section {
    height: 100vh;
    width: 100%;
    background-color: black;
    color: white;
}

.sec_info_title {
    padding: 5px;
    text-align: center;
}

.sec_vue_save {
    height: 20vh;
    overflow-y: auto;
}

.sec_info_enjeux {
    height: 50vh;
    overflow-y: auto;
    color: white !important;
    background-color: white;
}

.sec_calcul_itin {
    height: 30vh;
    overflow-y: auto;
}
</style>