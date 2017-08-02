import allContracts from '@/graphql/contracts/queries/allContracts.graphql'
import createContract from '@/graphql/contracts/mutations/create.graphql'
import Contract from '@/graphql/contracts/queries/contract.graphql'
import Subscription from '@/graphql/contracts/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allContracts },
    fetch: { Contract },
    create: { createContract }
  }),
  subscription('Contract', Subscription),
  {
    namespaced: true
  }
)
