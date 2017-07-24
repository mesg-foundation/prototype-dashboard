export default store => (to, from, next) => {
  const loggedIn = store.getters['session/connected']
  if (to.matched.some(record => record.meta.auth === true) && !loggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  if (to.matched.some(record => record.meta.auth === false) && loggedIn) {
    return next({ path: '/' })
  }
  next()
}
