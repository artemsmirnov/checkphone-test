<template>
  <form class="signin" @submit.prevent="signin({username, password})" :disabled="inProgress">
    <input type="text"
           placeholder="username"
           v-model="username"
    ></input>
    <input type="password"
           placeholder="password"
           v-model="password"
    ></input>
    <input type="submit" value="sign in"></input>
    <div v-if="inProgress">
      loading
    </div>
    <div v-if="error">
      {{error}}
    </div>
  </form>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'SignIn',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState('auth', [
      'inProgress',
      'error'
    ])
  },
  methods: {
    ...mapActions('auth', ['signin'])
  }
}
</script>

<style scoped>
</style>
