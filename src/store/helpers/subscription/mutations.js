export default {
  addListener: (state, { listener = null }) => (state.listeners = [...state.listeners, listener]),
  removeListeners: state => {
    state.listeners.forEach(x => x.unsubscribe())
    state.listeners = []
  }
}
