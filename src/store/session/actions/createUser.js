import client from '@/graphql'
import mutation from '@/graphql/users/mutations/create.graphql'

export default ({ commit, dispatch, rootGetters }, { variables }) => client()
  .mutate({
    mutation,
    variables
  })
  .then(({ data }) => dispatch('signin', { variables }))
