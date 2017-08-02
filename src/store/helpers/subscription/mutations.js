export default {
  addListener: (state, listener = null) => (state.listener = listener),
  removeListeners: state => {
    try {
      state.listener.unsubscribe()
    } catch (e) {}
    state.listener = null
  }
}
