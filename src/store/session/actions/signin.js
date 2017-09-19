import client from '@/graphql'
import mutation from '@/graphql/users/mutations/signin.graphql'

export default ({ commit, dispatch }, gqlConfig) => client()
  .mutate({
    mutation,
    fetchPolicy: 'network-only',
    ...gqlConfig
  })
  .then(({ data }) => commit('setToken', data.authenticateUser.token))
  .then(_ => dispatch('refresh'))
