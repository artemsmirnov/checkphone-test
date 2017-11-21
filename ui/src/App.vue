<template>
  <div id="app">
    <form @submit.prevent="check({phonenumber})">
      <input type="tel"
            placeholder="Phonenumber"
            v-model="phonenumber"
      ></input>
      <input type="submit" value="check"></input>
    </form>
    <div v-if="checkError" class="error">{{checkError}}</div>
    <div v-if="checkedPhonenumber && !checkError">
      {{checkedPhonenumber}}
      <span v-if="phonenumberExists">exists</span>
      <span v-else>doesn't exist</span>
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
