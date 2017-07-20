import client from '@/graphql'
import query from '@/graphql/webhooks/queries/webhook.graphql'

export default ({ commit, rootGetters }, { id }) => client()
  .query({
    query,
    variables: {
      id
    }
  })
  .then(({ data }) => commit('updateItem', { item: data.allWebhooks[0] }))
