import client from '@/graphql'
import mutation from '@/graphql/contracts/mutations/create.graphql'

export default ({ commit, rootGetters }, data) => client()
  .mutate({
    mutation,
    variables: {
      ...data,
      projectId: rootGetters['session/currentProjectId']
    }
  })
  // TODO: Not sure of the result.data.createWebhook
  .then(result => commit('updateItem', result.data.createContract))
