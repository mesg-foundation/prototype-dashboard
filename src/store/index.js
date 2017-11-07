import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import triggers from './triggers'
import contracts from './contracts'
import ethTokens from './ethTokens'
import projects from './projects'
import events from './events'
import taskLogs from './taskLogs'
import session from './session'
import users from './users'
import plans from './plans'
import invitations from './invitations'
import notifications from './notifications'
import services from './services'
import connectors from './connectors'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    triggers,
    contracts,
    ethTokens,
    projects,
    events,
    taskLogs,
    users,
    plans,
    session,
    invitations,
    notifications,
    services,
    connectors,
    actions
  },
  plugins: [
    createPersistedState({
      key: 'eth-hook'
    })
  ],
  state: {
    menu: true,
    showProjects: false
  },
  getters: {
    menu: state => state.menu,
    showProjects: state => state.showProjects
  },
  mutations: {
    updateMenu: (state, value) => (state.menu = value),
    updateShowProjects: (state, value) => (state.showProjects = value)
  }
})
