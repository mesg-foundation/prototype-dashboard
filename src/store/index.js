import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import webhooks from './webhooks'
import projects from './projects'
import session from './session'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    webhooks,
    projects,
    session
  },
  plugins: [
    // createPersistedState({
    //   key: 'eth-hook'
    // })
  ]
})
