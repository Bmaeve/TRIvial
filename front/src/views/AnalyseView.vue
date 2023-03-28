<template>
  <div id="Analyse">

    <Selection />

    <ITowns />

  </div>
</template>
  
<script>
// @ is an alias to /src
import ITowns from '@/components/Analyse/ITowns.vue'
import Selection from '@/components/Analyse/Selection.vue'

export default {
  name: 'TRIVialView',
  components: {
    Selection,
    ITowns
  }
}
</script>
  

<style>
#Analyse {
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    ". .";
}
</style>