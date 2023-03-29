<template>
    <div id="sec_section" class="container">
        <div class="sec_info_title">
            <h4>TRIvial - Secours</h4>
        </div>

        <div class="sec_vue_save">
            <span>Importer une vue enregistrée</span>
            <select class="form-select" size="3" aria-label="size 3 select example">
                <option v-for="item in plans" :value="item.id" :key="item.id">{{ item.title }}</option>
            </select>
            <br>
            <div class="d-grid gap-2 col-12 mx-auto">
                <button class="btn btn-info" type="button">Importer</button>
            </div>

        </div>

        <div class="sec_info_enjeux">
            <span>Informations</span>
            <div class="sec_info_enjeux_table">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Properties</th>
                            <th scope="col">value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(properties, key) in getfeatureKeys" :key='key'>
                            <tr>
                                <th>{{ properties }}</th>
                                <td>{{ getfeatureinfo[0][properties] }}</td>
                            </tr>

                        </template>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="sec_calcul_itin">
            <span>Itineraire</span>
            <div class="sec_itin">
                <button type="button" class="btn btn-secondary rounded float-start">
                    <img src="../../assets/start.png" width="35" height="35" />
                    <span>Start</span>
                </button>
                <button type="button" class="btn btn-secondary rounded float-end">
                    <span>End</span>
                    <img src="../../assets/end.png" width="35" height="35" />
                </button>

                <div class="d-grid gap-2 col-6 mx-auto">
                    <br>
                    <button class="btn btn-info" type="button">Calculer</button>
                </div>
            </div>
        </div>
        <br>
        <div class="sec_secour_logo">
            <img src="../../assets/logo.png" width="50" height="50" />
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

console.log($)


const getKeys = (object) => {
    return Object.keys(object)
}

export default {
    name: 'sec_Section',
    props: {
        featureInfoData: Array
    },
    data() {
        return {
            featureInfo: this.$props.featureInfoData,
            featureKeys: getKeys(this.$props.featureInfoData[0]),
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
    },
    computed: {
        getfeatureinfo() {
            return this.featureInfo
        },
        getfeatureKeys() {
            return this.featureKeys
        }
    },
    mounted() {

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
    height: 25vh;
    overflow-y: auto;
}

.sec_info_enjeux {
    color: white !important;

}

.sec_info_enjeux table {
    background-color: white;
}

.sec_info_enjeux_table {
    overflow-y: auto;
    height: 32vh;
}

.sec_calcul_itin {

    overflow-y: auto;

}

.sec_itin {
    background-color: white;
    margin-top: 10px;
    padding: 10px;
    height: 16vh;
}

.sec_secour_logo {
    text-align: center;
    color: white;
}
</style>