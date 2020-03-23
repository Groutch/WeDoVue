import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$http = axios


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
