import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import { loggedIn, withProject } from './router/guards'
import i18n from './i18n'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(Vuelidate)

router.beforeEach(loggedIn(store))
router.beforeEach(withProject(store))
router.afterEach(x => store.commit('updateShowProjects', false))

const initializeApp = () => new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})

store.dispatch('session/refresh')
  .then(initializeApp)
  .catch(initializeApp)
