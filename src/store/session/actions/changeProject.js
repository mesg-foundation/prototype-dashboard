export default ({ commit, dispatch, rootGetters }, { project }) => {
  // TODO update user to save his last selected project
  const projectId = project.id
  commit('setCurrentProjectId', projectId)
  return Promise.all([
    dispatch('events/subscribes', { projectId }, { root: true }),
    dispatch('contracts/subscribes', { projectId }, { root: true }),
    dispatch('users/subscribes', { projectId }, { root: true }),
    dispatch('webhookResults/subscribes', { projectId }, { root: true }),
    dispatch('webhooks/subscribes', { projectId }, { root: true })
  ])
}
