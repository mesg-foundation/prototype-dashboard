import client from '@/graphql'
import query from '@/graphql/projects/queries/allProjects.graphql'

export default ({ commit, dispatch, rootGetters }, { userId }) => client()
  .query({
    query,
    variables: {
      currentUserId: userId
    }
  })
  .then(({ data }) => {
    commit('updateCollection', { collection: data.allProjects })
    if (rootGetters['session/currentProjectId']) { return }
    if (data.allProjects.length === 0) { return }
    dispatch('session/changeProject', { project: data.allProjects[0] }, { root: true })
  })
