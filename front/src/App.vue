<template>
  <div id="app">
    <MyItowns />
  </div>
</template>

<script>
import MyItowns from './components/ITowns.vue'

export default {
  name: 'App',
  components: {
    MyItowns
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
