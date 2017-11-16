import allAddresses from '@/graphql/addresses/queries/allAddresses.graphql'
import Subscription from '@/graphql/addresses/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allAddresses }
  }),
  subscription('Keys', Subscription),
  {
    namespaced: true
  }
)
