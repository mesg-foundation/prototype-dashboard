import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import webhooks from './webhooks'
import contracts from './contracts'
import projects from './projects'
import events from './events'
import session from './session'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    webhooks,
    contracts,
    projects,
    events,
    session
  },
  plugins: [
    // createPersistedState({
    //   key: 'eth-hook'
    // })
  ]
})
