import client from '@/graphql'
import mutation from '@/graphql/events/mutations/event.graphql'

export default ({ commit, rootGetters }, data) => client()
  .mutate({
    mutation,
    variables: data
  })
  .then(result => result.data.createEvent)
  .then(event => {
    commit('updateItem', { item: event })
    return event
  })
