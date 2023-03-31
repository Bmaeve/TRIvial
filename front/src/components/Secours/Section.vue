<template>
    <!-- Section  -->
    <div id="sec_section" class="container">
        <!-- Section title -->
        <div class="sec_info_title">
            <h4>TRIvial - Secours</h4>
        </div>
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
        <!-- Feature information block -->
        <div class="sec_info_enjeux">
            <span>Informations</span>
            <!-- Feature information table block -->
            <div class="sec_info_enjeux_table">
                <!-- Feature information table -->
                <table class="table table-striped sec_table_info">
                    <!-- Feature properties table header -->
                    <thead>
                        <tr>
                            <th scope="col">Properties</th>
                            <th scope="col">value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loop for show the properties informations -->
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
        <!-- Itineraire calcul block -->
        <div class="sec_calcul_itin">
            <span>Itineraire</span>
            <!-- Itineraire calcul container -->
            <div class="sec_itin">
                <!-- Itineraire start button -->
                <button type="button" class="btn btn-secondary rounded float-start">
                    <img src="../../assets/start.png" width="35" height="35" />
                    <span>Start</span>
                </button>
                <!-- Itineraire end button -->
                <button type="button" class="btn btn-secondary rounded float-end">
                    <span>End</span>
                    <img src="../../assets/end.png" width="35" height="35" />
                </button>
                <!-- Itineraire calcul start button -->
                <div class="d-grid gap-2 col-6 mx-auto">
                    <br>
                    <button class="btn btn-info" type="button">Calculer</button>
                </div>
            </div>
        </div>
        <br>
        <!-- App logo block -->
        <div class="sec_secour_logo">
            <!-- App logo image -->
            <img src="../../assets/logo.png" width="50" height="50" />
        </div>
    </div>
</template>

<script>
//import jquery module
import $ from 'jquery'

console.log($)

//function for return object properties
const getKeys = (object) => {
    return Object.keys(object)
}

//component exporte
export default {
    name: 'sec_Section',
    props: {
        //feature information props config
        featureInfoData: Array
    },
    data() {
        return {
            //get feature information object in array
            featureInfo: this.$props.featureInfoData,
            //get attributes properties list in array
            featureKeys: getKeys(this.$props.featureInfoData[0]),
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
    },
    computed: {
        // return feature information data for the reactive vue
        getfeatureinfo() {
            return this.featureInfo
        },
        // return feature information properties for the reactive vue
        getfeatureKeys() {
            return this.featureKeys
        }
    },
    mounted() {

    }

}



</script>

<style>
/* Section */
#sec_section {
    height: 100vh;
    width: 100%;
    background-color: black;
    color: white;
}

/* Section title */
.sec_info_title {
    padding: 5px;
    text-align: center;
}

/* Decision view list */
.sec_vue_save {
    height: 25vh;
    overflow-y: auto;
}

/* Feature information block */
.sec_info_enjeux {
    color: white !important;

}

/* Feature information table */
.sec_table_info {
    background-color: white;
}

/* Feature information table block*/
.sec_info_enjeux_table {
    overflow-y: auto;
    height: 32vh;
}

/* Itineraire calcul block */
.sec_calcul_itin {

    overflow-y: auto;

}

/* Itineraire calcul container */
.sec_itin {
    background-color: white;
    margin-top: 10px;
    padding: 10px;
    height: 16vh;
}

/* App logo block */
.sec_secour_logo {
    text-align: center;
    color: white;
}
</style>