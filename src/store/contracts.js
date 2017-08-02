import allContracts from '@/graphql/contracts/queries/allContracts.graphql'
import createContract from '@/graphql/contracts/mutations/create.graphql'
import Contract from '@/graphql/contracts/queries/contract.graphql'
import updated from '@/graphql/contracts/subscriptions/updated.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allContracts },
    fetch: { Contract },
    create: { createContract }
  }),
  subscription('Contract', {
    updated
  }),
  {
    namespaced: true
  }
)
