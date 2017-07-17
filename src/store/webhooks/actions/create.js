import client from '@/graphql'
import mutation from '@/graphql/mutations/createWebhook.graphql'

export default ({ commit, rootGetters }, data) => client()
  .mutate({
    mutation,
    variables: {
      ...data,
      projectId: rootGetters['session/currentProjectId']
    }
  })
  .then(result => {
    debugger
  })
