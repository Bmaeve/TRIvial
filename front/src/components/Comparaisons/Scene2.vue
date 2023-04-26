<template>
    <!-- map reference image -->
    <img id="com_repere2" src="../../assets/centre-de-gravite.png" width="50" height="50" />
    <div id="com_Itowns2" class="com_itown"></div>
</template>
<script>

export default {
    name: 'MyScene2',
    data() {
        return {

        }
    }
}
</script>
<style>
#com_repere2 {
    position: absolute;
    top: 45vh;
    left: 75%;
    z-index: 100;
    opacity: .5;
}
</style>