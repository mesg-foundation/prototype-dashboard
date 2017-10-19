import allContracts from '@/graphql/ethTokens/queries/allContracts.graphql'
import { collection, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allContracts }
  }),
  {
    namespaced: true
  }
)
