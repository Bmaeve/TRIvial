<template>
  <div class="secoure">
    <ITowns />
  </div>
</template>
  
<script>
// @ is an alias to /src
import ITowns from '@/components/Secours/ITowns.vue'
//import SectionInfo from '@/components/Secours/Section.vue'

export default {
  name: 'SecoursView',
  components: {
    ITowns
  }
}


</script>
<style>
.secoure {
  width: 100%;
  display: flex;
}

#sec_panel {
  width: 20%;
  height: 100vh;
}

#sec_map {
  width: 80%;
}
</style>