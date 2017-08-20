import allTriggerResults from '@/graphql/triggerResults/queries/allTriggerResults.graphql'
import Subscription from '@/graphql/triggerResults/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allTriggerResults }
  }),
  subscription('TriggerResult', Subscription),
  {
    namespaced: true
  }
)
