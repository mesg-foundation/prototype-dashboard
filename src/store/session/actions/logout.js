export default ({ commit }) => {
  commit('setToken', null)
  commit('setCurrentProjectId', null)
  commit('setCurrentUser', null)
  localStorage.clear()
}
