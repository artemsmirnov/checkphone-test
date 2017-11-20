import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: '/api'
})

const auth = {
  namespaced: true,

  state: {
    inProgress: false,
    error: null
  },

  mutations: {
    signinRequest (state) {
      state.error = null
      state.inProgress = true
    },

    signinFailure (state, {error}) {
      state.inProgress = false
      state.error = error
    },

    signinSuccess (state) {
      state.inProgress = false

      this.commit('replaceRoute', 'Dashboard', {root: true})
    }
  },
  actions: {
    async initialize (context, payload) {
      if (!vueAuth.isAuthenticated()) {
        context.commit('replaceRoute', 'SignIn', {root: true})
      } else {
        context.commit('replaceRoute', 'Dashboard', {root: true})
      }
    },

    async signin (context, payload) {
      var formData = new URLSearchParams()
      formData.append('username', payload.username)
      formData.append('password', payload.password)
      formData.append('grant_type', 'password')
      formData.append('scope', 'phonenumbers')

      try {
        context.commit('signinRequest')
        const res = await vueAuth.login(formData)
        if (res.data.error) {
          context.commit('signinFailure', res.data)
        } else {
          context.commit('signinSuccess', res.data)
        }
      } catch (error) {
        console.log('unexpected error', error)
        context.commit('signinFailure', {
          error: 'unexpected_server_error'
        })
      }
    },

    async signout (context, payload) {
      try {
        await vueAuth.logout()
        context.commit('replaceRoute', 'SignIn', {root: true})
      } catch (error) {
        console.error(error)
      }
    }
  }
}

const phonenumbers = {
  namespaced: true,

  state: {
    list: [],
    loaded: false,
    loading: false,
    addError: null,
    addPhonenumber: ''
  },

  mutations: {
    loaded (state, {list}) {
      state.list = list
      state.loading = false
      state.loaded = true
    },
    loading (state) {
      state.loading = true
    },
    added (state, {phonenumber}) {
      state.addError = false
      if (state.list.indexOf(phonenumber) === -1) {
        state.list = state.list.concat(phonenumber)
      }
      state.addPhonenumber = ''
    },
    addFailure (state, {errors}) {
      state.addError = errors.phonenumber.msg
    },
    removed (state, {phonenumber: removedPhonenumber}) {
      state.list = state.list.filter(
        phonenumber => phonenumber !== removedPhonenumber
      )
    },
    updateAddPhonenumber (state, phonenumber) {
      state.addPhonenumber = phonenumber
    }
  },
  actions: {
    async getList (context) {
      context.commit('loading')
      const phonenumbers = await Vue.axios.get('/api/phones/list')
      context.commit('loaded', {
        list: phonenumbers.data.phonenumbers
      })
    },

    async remove (context, phonenumber) {
      await Vue.axios.post('/api/phones/delete', {phonenumber})
      context.commit('removed', {phonenumber})
    },

    async add (context, phonenumber) {
      try {
        const res = await Vue.axios.post('/api/phones/add', {phonenumber})
        context.commit('added', res.data)
      } catch (error) {
        context.commit('addFailure', error.response.data)
      }
    }
  }
}

export default new Vuex.Store({
  modules: {
    auth, phonenumbers
  },
  mutations: {
    replaceRoute (state, route) {
      router.replace(route)
    }
  }
})
