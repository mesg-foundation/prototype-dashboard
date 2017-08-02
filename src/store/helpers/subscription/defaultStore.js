import { _listener, _eventListener, _subscribeTo } from './naming'

export default actions => ({
  state: {},
  getters: {},
  mutations: {
    addListener: (state, { action, listener = null }) => (state[_listener(action)] = listener),
    removeListener: (state, { action }) => (state[_listener(action)] = null)
  },
  actions: {
    subscribes: ({ dispatch }, variables) => {
      dispatch('unsubscribe')
      return Object.keys(actions)
        .forEach(action => dispatch(_subscribeTo(action), variables))
    },
    unsubscribe: ({ getters, commit }) => Object.keys(actions)
      .forEach(action => {
        const listener = getters[_eventListener(action)]
        if (listener) { listener.unsubscribe() }
        commit('removeListener', { action })
      })
  }
})
