import client from '@/graphql'
import mutation from '@/graphql/projects/mutations/create.graphql'

export default ({ commit, dispatch, rootGetters }, { name }) => client()
  .mutate({
    mutation,
    variables: {
      name,
      userId: rootGetters['session/currentUserId']
    }
  })
  .then(result => result.data.createProject)
  .then(project => {
    commit('updateItem', { item: project })
    dispatch('session/changeProject', { project: project }, { root: true })
    return project
  })
