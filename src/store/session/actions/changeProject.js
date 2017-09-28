const PROJECT_SUBSCRIBERS = [
  'events',
  'contracts',
  'users',
  'triggers',
  'taskLogs',
  'invitations',
  'connectors',
  'actions'
]

export default async ({ commit, dispatch, rootGetters }, { project }) => {
  const projectId = project.id
  commit('setCurrentProjectId', projectId)
  const subscriptions = PROJECT_SUBSCRIBERS
    .map(x => dispatch(`${x}/subscribes`, { projectId }, { root: true }))
  await Promise.all(subscriptions)
  commit('updateShowProjects', false, { root: true })
  await dispatch('quotas', { variables: { id: projectId } })
}
