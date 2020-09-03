import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import { apolloProvider } from './vue-apollo'

Vue.config.productionTip = false

new Vue({
  Vuex,
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
