export default ({ commit, dispatch, rootGetters }, { project }) => {
  // TODO update user to save his last selected project
  commit('setCurrentProject', project)
}
