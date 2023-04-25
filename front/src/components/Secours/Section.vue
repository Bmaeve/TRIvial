<template>
    <!-- Feature information block -->
    <div class="sec_info_enjeux">
        <span>Informations</span>
        <p id="explications"> Cliquez sur un bâtiment</p>
        <!-- Feature information table block -->
        <div class="sec_info_enjeux_table" id="info_sec">
            <!-- Feature information table -->
        </div>

    </div>
    <!-- Itineraire calcul block -->
    <div class="sec_calcul_itin">
        <span>Itineraire</span>
        <p id="explications"> Maintenez le clic 1s sur un bâtiment</p>
        <!-- Itineraire calcul container -->
        <div class="sec_itin">

            <ul>
                <li v-for="etape in liste_etapes" :key="etape.seq">
                    <p v-if="etape.rue_g != null">Parcourir {{ Math.round(etape.distance) }} m sur {{ etape.rue_g }}</p>
                    <p v-else-if="etape.rue_d != null">Parcourir {{ Math.round(etape.distance) }} m sur {{ etape.rue_d }}
                    </p>
                    <p v-else>Parcourir {{ Math.round(etape.distance) }} m</p>
                    <p id="inondation" v-if="etape.concerned == true">==> Attention route inondée !</p>
                </li>
            </ul>
        </div>
    </div>
    <br>
    <!-- App logo block -->
    <div class="sec_secour_logo">
        <!-- App logo image -->
        <img src="../../assets/logoBlack.png" width="50" height="50" />
    </div>
    <div id="sec_bouton2">
        <a href="/TRIvial"> <button class="btn btn-outline-success">
                <!-- <img src="../../assets/menu(1).png" width="50"
                    height="50" /> -->
                MENU
            </button></a>
    </div>
</template>

<script>

//import the store
import { store } from '../Store.js'

//component export
export default {
    name: 'sec_Section',
    data() {
        return {
            store,
        }
    },
    computed: {
        liste_etapes() {
            return store.itineraire
        }
    }

}

</script>

<style>
/* Section */

/* Section title */
.sec_info_title {
    padding: 5px;
    text-align: center;
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
    height: 20vh;
}

/* Itineraire calcul block */


/* Itineraire calcul container */
.sec_itin {
    overflow-y: auto;
    background-color: white;
    margin-top: 10px;
    padding: 10px;
    height: 16vh;
    color: black;
}

/* App logo block */
.sec_secour_logo {
    text-align: center;
    color: white;
}

#sec_bouton2 {
    position: relative;
    left: 35%;
    margin-top: 5px;
}


.sec_info_enjeux {
    margin-bottom: 19%;
}

#inondation {
    color: red;
}

#explications {
    font-size: small;
}
</style>