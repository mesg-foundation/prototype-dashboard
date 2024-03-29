import client from '@/graphql'
import query from '@/graphql/users/queries/current.graphql'

export default ({ commit, dispatch, getters }) => client()
  .query({
    query,
    fetchPolicy: 'network-only'
  })
  .then(({ data }) => {
    commit('setCurrentUser', data.loggedInUser)
    return data.loggedInUser
  })
  .then(user => {
    if (!user) { return [[], null] }
    return Promise.all([
      dispatch('projects/fetchAll', { variables: { currentUserId: user.id } }, { root: true }),
      dispatch('projects/subscribes', { userId: user.id }, { root: true }),
      dispatch('plans/subscribes', {}, { root: true })
    ])
  })
  .then(([projects, ...subscriptions]) => {
    const project = [
      ...projects.filter(x => x.id === getters.currentProjectId),
      ...projects
    ][0]
    if (!project) { return }
    dispatch('changeProject', { project })
  })
