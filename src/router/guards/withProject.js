export default store => (to, from, next) => {
  const withProject = store.getters['session/currentProjectId']
  if (to.matched.some(record => record.meta.project === true) && !withProject) {
    return next({ name: 'NewProject' })
  }
  next()
}
