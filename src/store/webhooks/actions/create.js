import client from '@/graphql'
import mutation from '@/graphql/webhooks/mutations/create.graphql'

export default ({ commit, rootGetters }, data) => client()
  .mutate({
    mutation,
    variables: {
      ...data,
      projectId: rootGetters['session/currentProjectId']
    }
  })
  .then(result => result.data.createWebhook)
  .then(webhook => {
    commit('updateItem', { item: webhook })
    commit('projects/replaceItem', { item: webhook.project }, { root: true })
    return webhook
  })
