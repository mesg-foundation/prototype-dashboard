import client from '@/graphql'
import mutation from '@/graphql/mutations/createUser.graphql'

export default ({ commit }, { email, password }) => client()
  .mutate({
    mutation,
    variables: {
      email,
      password
    }
  })
  .then(({ data }) => commit('updateCollection', { collection: data.allWebhooks }))
