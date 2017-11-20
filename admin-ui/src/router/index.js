import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
