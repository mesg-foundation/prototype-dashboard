import allPlans from '@/graphql/plans/queries/allPlans.graphql'
import Subscription from '@/graphql/plans/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allPlans }
  }),
  subscription('Plan', Subscription),
  {
    namespaced: true
  }
)
