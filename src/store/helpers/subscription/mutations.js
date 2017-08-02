export default {
  addListener: (state, listener = null) => (state.listener = listener),
  removeListeners: state => {
    if (state.listener) {
      state.listener.unsubscribe()
    }
    state.listeners = null
  }
}
