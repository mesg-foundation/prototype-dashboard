import allUsers from '@/graphql/users/queries/allUsers.graphql'
import Subscription from '@/graphql/users/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allUsers }
  }),
  subscription('User', Subscription),
  {
    namespaced: true
  }
)
