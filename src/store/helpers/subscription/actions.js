import client from '@/graphql'

const transformMutation = x => [
  x.toLowerCase().slice(0, -1),
  'Item'
].join('')

export default (item, subscriptions) => ({
  unsubscribe: ({ getters, commit }) => commit('removeListeners'),
  subscribes: ({ dispatch, commit }, variables) => {
    dispatch('unsubscribe')
    subscriptions.forEach(query => commit('addListener', {
      listener: client()
        .subscribe({ query, variables })
        .subscribe({
          next: event => commit(transformMutation(event[item].mutation), { item: event[item].node })
        })
    }))
  }
})
