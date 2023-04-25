<template>
    <!-- map reference image -->
    <img id="com_repere1" src="../../assets/centre-de-gravite.png" width="50" height="50" />
    <div id="com_Itowns1" class="com_itown"></div>
</template>
<script>

export default {
    name: 'MyScene1',
    data() {
        return {

        }
    }
}
</script>
<style>
#com_repere1 {
    position: absolute;
    top: 45vh;
    left: 25%;
    z-index: 100;
    opacity: .5;
}
</style>