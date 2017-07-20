import client from '@/graphql'
import query from '@/graphql/events/queries/event.graphql'

export default ({ commit, rootGetters }, { id }) => client()
  .query({
    query,
    variables: {
      id
    }
  })
  .then(({ data }) => commit('updateItem', { item: data.allEvents[0] }))
