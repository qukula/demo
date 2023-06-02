import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './css/reset.css'

import api, { handleApi } from '@/api/index.js'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$handleApi = handleApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
