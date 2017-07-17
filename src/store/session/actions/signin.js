import client from '@/graphql'
import mutation from '@/graphql/users/mutations/signin.graphql'

export default ({ commit, dispatch }, { email, password }) => client()
  .mutate({
    mutation,
    variables: {
      email,
      password
    },
    fetchPolicy: 'network-only'
  })
  .then(({ data }) => commit('setToken', data.signinUser.token))
  .then(_ => dispatch('refresh'))
