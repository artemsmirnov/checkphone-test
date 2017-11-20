<template>
  <div id="app">
    <input type="tel"
           placeholder="Phonenumber"
           v-model="phonenumber"
    ></input>
    <button @click="check({phonenumber})">check</button>
    <div v-if="checkError" class="error">{{checkError}}</div>
    <div v-else>
      <div v-if="phonenumberExists">exists</div>
      <div v-else>not exists</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  data: function () {
    return {
      phonenumber: ''
    }
  },
  computed: {
    ...mapState([
      'checkedPhonenumber',
      'checking',
      'phonenumberExists',
      'checkError'
    ])
  },
  methods: {
    ...mapActions(['check'])
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

.error {
  color: red;
}
</style>
