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
    return dispatch('projects/fetchAll', { currentUserId: user.id }, { root: true })
  })
  .then(projects => {
    if (getters.currentProjectId) { return }
    if (projects.length === 0) { return }
    dispatch('changeProject', { project: projects[0] })
  })
