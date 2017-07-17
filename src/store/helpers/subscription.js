import client from '@/graphql'

const subscribe = (item, { created, updated, removed }, variables) => {
  const subscriptionClient = client()

  return ({ commit, rootGetters }) => {
    const subscribeToCreatedEvent = () => subscriptionClient
      .subscribe({
        query: created,
        variables: variables(rootGetters)
      })
      .subscribe({
        next: result => commit('createItem', { item: result[item].node })
      })

    const subscribeToUpdatedEvent = () => subscriptionClient
      .subscribe({
        query: updated,
        variables: variables(rootGetters)
      })
      .subscribe({
        next: result => commit('updateItem', { item: result[item].node })
      })

    const subscribeToDeletedEvent = () => subscriptionClient
      .subscribe({
        query: removed,
        variables: variables(rootGetters)
      })
      .subscribe({
        next: ({ data }) => commit('deleteItem', { id: data.previousValues.id })
      })

    if (created) { subscribeToCreatedEvent() }
    if (updated) { subscribeToUpdatedEvent() }
    if (removed) { subscribeToDeletedEvent() }
    return Promise.resolve()
  }
}

export default (item, { created, updated, removed }, variables = () => ({})) => {
  if (!item) { throw new Error('Item need to be defined') }

  return {
    actions: {
      subscribe: subscribe(item, {
        created,
        removed,
        updated
      }, variables)
    }
  }
}
