import client from '@/graphql'
import query from '@/graphql/events/queries/allEvents.graphql'

export default ({ commit, rootGetters }, { webhookId }) => client()
  .query({
    query,
    variables: {
      webhookId
    }
  })
  .then(({ data }) => commit('updateCollection', { collection: data.allEvents }))
