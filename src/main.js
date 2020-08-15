import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import './plugins/snow'
import './plugins/tree-grid'
import './network/request'

Vue.config.productionTip = false

const vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default vue
