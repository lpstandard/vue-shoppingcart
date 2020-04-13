import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/Pages/Products'
import Login from '@/components/Pages/Login'
import CustomerOrder from '@/components/Pages/CustomerOrders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder
        }
      ]
    }
  ]
})
