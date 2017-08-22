import allTaskLogs from '@/graphql/taskLogs/queries/allTaskLogs.graphql'
import Subscription from '@/graphql/taskLogs/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allTaskLogs }
  }),
  subscription('TaskLog', Subscription),
  {
    namespaced: true
  }
)
