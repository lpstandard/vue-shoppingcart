// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
// import '../../../../Library/Caches/typescript/2.9/node_modules/@types/bootstrap'
import '../node_modules/bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from "./filters/currency"

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('need verify')
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      if (response.data.success) {
        console.log('res.data', response.data)
        next()
      } else {
        next(
          { path: '/login' }
        )
      }
    });
  } else {
    next()
  }
})