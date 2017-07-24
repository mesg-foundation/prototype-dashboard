import client from '@/graphql'
import mutation from '@/graphql/users/mutations/create.graphql'

export default ({ commit, dispatch, rootGetters }, { email, password }) => client()
  .mutate({
    mutation,
    variables: {
      email,
      password
    }
  })
  .then(({ data }) => dispatch('signin', { email, password }))
