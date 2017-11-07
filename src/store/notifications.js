import allNotifications from '@/graphql/notifications/queries/allNotifications.graphql'
import Subscription from '@/graphql/notifications/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allNotifications }
  }),
  subscription('Notification', Subscription),
  {
    namespaced: true
  }
)
