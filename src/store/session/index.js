import Cookie from 'js-cookie'
import actions from './actions'

const id = object => (object || {}).id || null

export default {
  namespaced: true,
  actions,
  state: {
    currentUser: null,
    currentProject: null,
    token: Cookie.get(process.env.AUTH_COOKIE_NAME_TOKEN)
  },
  mutations: {
    setCurrentProject: (state, project) => {
      Cookie.set(process.env.AUTH_COOKIE_NAME_PROJECT, id(project))
      state.currentProject = project
    },
    setCurrentUser: (state, user) => {
      Cookie.set(process.env.AUTH_COOKIE_NAME_USER, id(user))
      state.currentUser = user
    },
    setToken: (state, token) => {
      Cookie.set(process.env.AUTH_COOKIE_NAME_TOKEN, token)
      state.token = token
    }
  },
  getters: {
    connected: (state, getters) => !!getters.currentUserId && !!state.token,
    currentUserId: state => id(state.currentUser),
    currentProjectId: state => id(state.currentProject),
    currentProject: state => state.currentProject
  }
}
