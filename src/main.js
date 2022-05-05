import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

/*layouts
import Default from './layouts/Default.vue'
import Admin from './layouts/Admin.vue'

Vue.component('default-layout', Default)
Vue.component('admin-layout', Admin)
*/

Vue.use(VueAxios,axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
