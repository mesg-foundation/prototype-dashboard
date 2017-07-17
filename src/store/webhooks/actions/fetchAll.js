import client from '@/graphql'
import query from '@/graphql/webhooks/queries/allWebhooks.graphql'

export default ({ commit, rootGetters }, { projectId }) => client()
  .query({
    query,
    variables: {
      projectId
    }
  })
  .then(({ data }) => commit('updateCollection', { collection: data.allWebhooks }))
