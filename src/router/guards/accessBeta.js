export default store => (to, from, next) => {
  const currentUser = store.getters['session/currentUser']
  if (to.matched.some(record => record.meta.beta === true) && !(currentUser || {}).betaUser) {
    return next({ name: 'Beta' })
  }
  if (to.matched.some(record => record.meta.beta === false) && (currentUser || {}).betaUser) {
    return next({ path: '/' })
  }
  next()
}
