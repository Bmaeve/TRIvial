<template>
    <!-- Feature information block -->
    <div class="an_info_enjeux">
        <span>Informations</span>
        <!-- Feature information table block -->
        <div class="an_info_enjeux_table">
            <!-- Feature information table -->
            <table class="table table-striped an_table_info">
                <!-- Feature properties table header -->
                <thead>
                    <tr>
                        <th scope="col">Propriété</th>
                        <th scope="col">Valeur</th>
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
</template>

<script>

import $ from '../../../node_modules/jquery';

console.log($);
//function for return object properties
const getKeys = (object) => {
    return Object.keys(object)
}
export default {
    name: "AnSelection",
    props: {
        //feature information props config
        featureInfoData: Array
    },
    components: {
    },
    data() {
        return {
            //get feature information object in array
            featureInfo: this.$props.featureInfoData,
            //get attributes properties list in array
            featureKeys: getKeys(this.$props.featureInfoData[0]),
        }
    }
    ,
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

}
</script>

<style>
/* #an_selection {
     width: 25%; 
    height: 100vh;
    overflow: scroll;
} */


/* Feature information block */
.an_info_enjeux {
    color: white !important;
    width: 100%;

}

/* Feature information table */
.an_table_info {
    background-color: white;

}

/* Feature information table block*/
.an_info_enjeux_table {
    overflow-y: auto;
    height: 40vh;
}

.an_select_form {
    height: 40vh;
    overflow-y: auto;
}
</style>