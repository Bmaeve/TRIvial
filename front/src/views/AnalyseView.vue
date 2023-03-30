<template>
  <div id="Analyse">

    <Selection />

    <ITowns />

    <Stats />
  </div>
</template>
  
<script>
// @ is an alias to /src
import ITowns from '@/components/Analyse/ITowns.vue';
import Selection from '@/components/Analyse/Selection.vue';
import Stats from '@/components/Analyse/Stats.vue'

export default {
  name: 'TRIVialView',
  components: {
    Selection,
    ITowns,
    Stats
  }
}
</script>
  

<style>
#Analyse {
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 1fr 15%;
  gap: 0px 0px;
  width: 100vw;
  height: 100vh;
}
</style>