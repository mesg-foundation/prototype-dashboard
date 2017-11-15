import allKeys from '@/graphql/keys/queries/allKeys.graphql'
import createKey from '@/graphql/keys/mutations/createKey.graphql'
import Subscription from '@/graphql/keys/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allKeys },
    create: { createKey }
  }),
  subscription('Keys', Subscription),
  {
    namespaced: true
  }
)
