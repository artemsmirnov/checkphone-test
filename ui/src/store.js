import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkedPhonenumber: '',
    checking: false,
    phonenumberExists: null,
    checkError: null
  },
  mutations: {
    checking (state) {
      state.checking = true
      state.phonenumberExists = null
    },
    checked (state, {phonenumber, exists, errors}) {
      state.checkedPhonenumber = phonenumber
      state.checking = false
      state.phonenumberExists = exists
      state.checkError = null

      if (errors && errors.phonenumber) {
        state.checkError = errors.phonenumber.msg
      }
    }
  },
  actions: {
    async check (context, {phonenumber}) {
      context.commit('checking', phonenumber)

      const checkRequest = new Request('/api/phones/check', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({phonenumber})
      })

      const checkResponse = await fetch(checkRequest)
      const {exists, errors} = await checkResponse.json()

      context.commit('checked', {phonenumber, exists, errors})
    }
  }
})
