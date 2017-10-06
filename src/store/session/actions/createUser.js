import client from '@/graphql'
import mutation from '@/graphql/users/mutations/create.graphql'

export default ({ commit, dispatch, rootGetters }, gqlConfig) => client()
  .mutate({
    mutation,
    ...gqlConfig
  })
  .then(({ data }) => dispatch('signin', gqlConfig))
  .then(() => dispatch('projects/createAndSelect', { variables: {
    name: 'Default Project',
    userId: rootGetters['session/currentUserId']
  } }, { root: true }))
