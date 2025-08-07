<template>
  <div id="app">
    <JSONLab />
  </div>
</template>

<script>
import JSONLab from './components/JSON.vue'

export default {
  name: 'App',
  components: {
    JSONLab
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
