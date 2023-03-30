<template>
    <div id="an_stats" class=" bg-dark">

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
    height: 5vh;
    z-index: 1000000;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 25%);

}

#an_bouton {
    grid-column: 4/5;
}
</style>