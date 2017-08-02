import client from '@/graphql'
import query from '@/graphql/users/queries/current.graphql'

export default ({ commit, dispatch, getters }) => client()
  .query({
    query,
    fetchPolicy: 'network-only'
  })
  .then(({ data }) => {
    commit('setCurrentUser', data.user)
    return data.user
  })
  .then(user => {
    if (!user) { return [] }
    return Promise.all([
      dispatch('projects/fetchAll', { currentUserId: user.id }, { root: true }),
      dispatch('projects/subscribes', { userId: user.id }, { root: true })
    ])
  })
  .then(([projects, subscriptions]) => {
    const project = [
      ...projects.filter(x => x.id === getters.currentProjectId),
      ...projects
    ][0]
    if (!project) { return }
    dispatch('changeProject', { project })
  })
