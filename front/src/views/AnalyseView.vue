<template>
  <div id="Analyse">
    <div id="first_row">
      <ITowns />
    </div>
    <div id="second_row">
      <Stats />
    </div>

  </div>
</template>
  
<script>
// @ is an alias to /src
import ITowns from '@/components/Analyse/ITowns.vue';
//import Selection from '@/components/Analyse/Selection.vue';
import Stats from '@/components/Analyse/Stats.vue'

export default {
  name: 'TRIVialView',
  components: {
    //Selection,
    ITowns,
    Stats
  }
}
</script>
  

<style>
#Analyse {
  display: flex;
  flex-direction: column;
  /* grid-template-rows: 1fr 20%;
  gap: 0px 0px;*/
  width: 100vw;
  height: 100vh;
}

#first_row {
  width: 100%;
  display: flex;
  /* grid-row: 1/2;
  display: grid;
  grid-template-columns: 25% 1fr;
  overflow-y: hidden; */
}

#second_row {
  width: 100%;
  /* grid-row: 2/3; */
}

#an_panel {
  width: 20%;
  height: 100vh;
}

#an_map {
  width: 80%;
}
</style>