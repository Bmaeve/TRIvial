<template>
    <div id="an_stats" class=" bg-dark">
        <div class="card" id="card1">
            <div class="card-body">
                <p class="card-text">1ère statistique
                </p>
            </div>
        </div>
        <div class="card" id="card2">
            <div class="card-body">
                <p class="card-text">2ème statistique
                </p>
            </div>
        </div>
        <div class="card" id="card3">
            <div class="card-body">
                <p class="card-text">3ème statistique
                </p>
            </div>
        </div>
        <button id="an_bouton" type="button" class="btn btn-outline-success  ">Enregister la vue</button>
    </div>
</template>

<script>
export default {
    name: "AnStats"
}

</script>

<style>
#an_stats {
    position: absolute;
    bottom: 0;
    height: 10vh;
    z-index: 1000000;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 25%);

}

#an_bouton {
    grid-column: 4/5;
    margin: auto;
}

.card {
    margin: 2%;
}

.card-text {
    text-align: center;

}
</style>