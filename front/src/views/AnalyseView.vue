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
import Stats from '@/components/Analyse/Stats.vue'

export default {
  name: 'TRIVialView',
  components: {
    ITowns,
    Stats
  }, mounted() {
    document.title = "TRIvial"
  }
}
</script>
  

<style>
#Analyse {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

#first_row {
  width: 100%;
  display: flex;
}

#second_row {
  width: 100%;
}

#an_panel {
  padding: 20px;
  width: 25%;
  min-width: 20%;
  max-width: 25%;
  height: 90vh;
  resize: horizontal;
  overflow-y: scroll;
}

#an_map {
  width: 80%;
  height: 90vh;
  resize: horizontal;
}
</style>