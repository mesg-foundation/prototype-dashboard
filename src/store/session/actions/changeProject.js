const PROJECT_SUBSCRIBERS = [
  'events',
  'contracts',
  'users',
  'webhooks',
  'webhookResults',
  'invitations'
]

export default ({ commit, dispatch, rootGetters }, { project }) => {
  // TODO update user to save his last selected project
  const projectId = project.id
  commit('setCurrentProjectId', projectId)
  return Promise.all(PROJECT_SUBSCRIBERS
    .map(x => dispatch(`${x}/subscribes`, { projectId }, { root: true }))
  )
}
