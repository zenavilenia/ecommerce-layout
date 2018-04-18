import Vue from 'vue'
import Router from 'vue-router'
import Ecommerce from '@/components/Ecommerce'
import LoginAdmin from '@/components/LoginAdmin'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ecommerce',
      component: Ecommerce
    },
    {
      path: '/admin',
      name: 'LoginAdmin',
      component: LoginAdmin
    },
    {
      path: '/admin-page',
      name: 'Admin',
      component: Admin
    }
  ]
})
