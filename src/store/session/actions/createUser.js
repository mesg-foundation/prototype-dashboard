import client from '@/graphql'
import mutation from '@/graphql/users/mutations/create.graphql'

export default ({ commit, dispatch, rootGetters }, gqlConfig) => client()
  .mutate({
    mutation,
    ...gqlConfig
  })
  .then(({ data }) => dispatch('signin', gqlConfig))
