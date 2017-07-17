import client from '@/graphql'
import query from '@/graphql/queries/allWebhooks.graphql'

export default ({ commit, rootGetters }, { projectId }) => client()
  .query({
    query,
    variables: {
      projectId
    }
  })
  .then(({ data }) => commit('updateCollection', { collection: data.allWebhooks }))
