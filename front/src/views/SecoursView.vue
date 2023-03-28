<template>
  <div class="secoure">
    <div id="sec_panel">
      <SectionInfo />
    </div>
    <div id="sec_map">
      <ITowns />
    </div>

  </div>
</template>
  
<script>
// @ is an alias to /src
import ITowns from '@/components/Secours/ITowns.vue'
import SectionInfo from '@/components/Secours/Section.vue'

export default {
  name: 'SecoursView',
  components: {
    ITowns,
    SectionInfo
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