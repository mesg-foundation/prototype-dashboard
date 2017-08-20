import allServices from '@/graphql/services/queries/allServices.graphql'
import Service from '@/graphql/services/queries/Service.graphql'
import Subscription from '@/graphql/services/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allServices },
    fetch: { Service }
  }),
  subscription('Service', Subscription),
  {
    namespaced: true
  }
)
