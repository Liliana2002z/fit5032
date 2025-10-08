<template>
  <div id="app">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>

import BHeader from './components/BHeader.vue';
export default {
  name: 'App',
  components: {
    BHeader,
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
.main-content {
  padding-top: 20px;
}
</style>