import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import i18n from './i18n'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(Vuelidate)

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['session/connected']
  if (to.matched.some(record => record.meta.auth === true) && !loggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  if (to.matched.some(record => record.meta.auth === false) && loggedIn) {
    return next({ path: '/' })
  }
  next()
})

store.dispatch('session/refresh')
.then(_ => new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
}))
