import client from '@/graphql'
import mutation from '@/graphql/users/mutations/create.graphql'

export default ({ commit }, { email, password }) => client()
  .mutate({
    mutation,
    variables: {
      email,
      password
    }
  })
  .then(({ data }) => commit('updateCollection', { collection: data.allWebhooks }))
