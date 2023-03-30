<template>
    <div id="an_stats" class="row bg-dark">

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
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-column: 1/3;
    grid-row: 2/3;

}

#an_bouton {
    grid-column: 4/5;
}
</style>