<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('auth/initialize')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button, input {
  border: 0.05rem solid #888;
  border-radius: 0;
  padding: 0.25rem;
  margin: 0.25rem;
}

</style>
