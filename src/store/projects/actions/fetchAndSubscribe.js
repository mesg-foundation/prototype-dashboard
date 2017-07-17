export default ({ dispatch }, { user }) => {
  if (!user) { return Promise.resolve(user) }
  return Promise.all([
    dispatch('subscribe'),
    dispatch('fetchAll', { userId: user.id })
  ])
}
