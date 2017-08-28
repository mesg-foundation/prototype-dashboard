import client from '@/graphql'
import quotas from '@/graphql/projects/queries/quotas.graphql'

export default ({ commit }, gqlConfig) => client()
  .query({
    query: quotas,
    ...gqlConfig
  })
  .then(({ data }) => commit('updateQuotas', data))
