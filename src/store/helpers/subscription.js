import client from '@/graphql'
import Utils from '@/utils'

const defaultStore = actions => ({
  state: {},
  getters: {},
  mutations: {
    addListener: (state, { action, listener = null }) => (state[`${action}Listener`] = listener),
    removeListener: (state, { action }) => (state[`${action}Listener`] = null)
  },
  actions: {
    subscribes: ({ dispatch }) => Object.keys(actions)
      .forEach(action => dispatch(`subscribeTo${Utils.toHuman(action)}Event`)),
    unsubscribe: ({ getters, commit }) => Object.keys(actions)
      .forEach(action => {
        const listener = getters[`${action}EventListener`]
        if (listener) { listener.unsubscribe() }
        commit('removeListener', { action })
      })
  }
})

const subscriptionsBehaviors = {
  created: { mutation: 'createItem', payload: item => result => ({ item: result[item].node }) },
  updated: { mutation: 'updateItem', payload: item => result => ({ item: result[item].node }) },
  removed: { mutation: 'deleteItem', payload: item => result => ({ item: result.data.previousValues.id }) }
}

const guard = (item, actions, variables) => {
  if (!item) { throw new Error('Item need to be defined') }
  if (!variables) { throw new Error('Variables parameter for subscriptions need to be a function') }
  const validAction = action => Object.keys(subscriptionsBehaviors).indexOf(action) >= 0
  const validActions = actions => Object.keys(actions).reduce((prev, action) => prev && validAction(action), true)
  if (!validActions(actions)) { throw new Error(`Actions for subscriptions needs to be one or many of thoses ${Object.keys(subscriptionsBehaviors)}`) }
  return true
}

export default (item, actions = {}, variables = rootGetter => ({})) => guard(item, actions, variables) && Object.keys(actions)
  .reduce((acc, action) => ({
    ...acc,
    state: {
      ...acc.state,
      [`${action}Listener`]: null
    },
    getters: {
      ...acc.getters,
      [`${action}EventListener`]: state => state[action]
    },
    actions: {
      ...acc.actions,
      [`subscribeTo${Utils.toHuman(action)}Event`]: ({ commit, rootGetters }) => {
        const behavior = subscriptionsBehaviors[action]
        const payload = behavior.payload(item)
        const listener = client()
          .subscribe({ query: actions[action], variables: variables(rootGetters) })
          .subscribe({
            next: event => commit(behavior.mutation, payload(event)),
            error: error => console.log('error', error),
            complete: () => console.log('complete')
          })
        commit('addListener', { action, listener })
        return Promise.resolve(listener)
      }
    }
  }), defaultStore(actions))
