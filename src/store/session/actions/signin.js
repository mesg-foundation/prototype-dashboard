import client from '@/graphql'
import mutation from '@/graphql/users/mutations/signin.graphql'

export default ({ commit, dispatch }, { variables }) => client()
  .mutate({
    mutation,
    variables,
    fetchPolicy: 'network-only'
  })
  .then(({ data }) => commit('setToken', data.signinUser.token))
  .then(_ => dispatch('refresh'))
