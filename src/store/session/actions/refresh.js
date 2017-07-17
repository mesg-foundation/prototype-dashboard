import client from '@/graphql'
import query from '@/graphql/users/queries/current.graphql'

export default ({ commit, dispatch }) => client()
  .query({
    query,
    fetchPolicy: 'network-only'
  })
  .then(({ data }) => {
    commit('setCurrentUser', data.user)
    return Promise.resolve(data.user)
  })
  .then(user => dispatch('projects/fetchAndSubscribe', { user }, { root: true }))
