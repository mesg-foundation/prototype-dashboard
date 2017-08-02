import client from '@/graphql'

const transformMutation = x => [
  x.toLowerCase().slice(0, -1),
  'Item'
].join('')

export default (item, subscription) => ({
  unsubscribe: ({ getters, commit }) => commit('removeListeners'),
  subscribes: ({ dispatch, commit }, variables) => {
    dispatch('unsubscribe')
    commit('addListener', client()
      .subscribe({ query: subscription, variables })
      .subscribe({
        next: event => commit(transformMutation(event[item].mutation), { item: event[item].node })
      })
    )
  }
})
