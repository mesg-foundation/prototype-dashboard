import Cookie from 'js-cookie'
import actions from './actions'

const id = object => (object || {}).id || null

export default {
  namespaced: true,
  actions,
  state: {
    currentUser: null,
    currentProjectId: Cookie.get(process.env.AUTH_COOKIE_NAME_PROJECT),
    token: Cookie.get(process.env.AUTH_COOKIE_NAME_TOKEN),
    quotas: {}
  },
  mutations: {
    setCurrentProjectId: (state, projectId) => {
      Cookie.set(process.env.AUTH_COOKIE_NAME_PROJECT, projectId)
      state.currentProjectId = projectId
    },
    setCurrentUser: (state, user) => {
      state.currentUser = user
    },
    setToken: (state, token) => {
      Cookie.set(process.env.AUTH_COOKIE_NAME_TOKEN, token)
      state.token = token
    },
    updateQuotas: (state, quotasResponse) => {
      const setQuota = (value, maximum) => ({
        maximum,
        value,
        percent: value / maximum * 100,
        reached: value >= maximum
      })
      state.quotas = {
        members: setQuota(
          quotasResponse.Project._usersMeta.count,
          quotasResponse.Project.plan.members
        ),
        executions: setQuota(
          quotasResponse._allTaskLogsMeta.count,
          quotasResponse.Project.plan.executions
        ),
        contracts: setQuota(
          quotasResponse.Project._contractsMeta.count,
          quotasResponse.Project.plan.contracts
        )
      }
    }
  },
  getters: {
    connected: (state, getters) => !!getters.currentUserId && !!state.token,
    currentUserId: state => id(state.currentUser),
    currentProjectId: state => state.currentProjectId,
    quotas: state => state.quotas
  }
}
