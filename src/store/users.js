import allUsers from '@/graphql/users/queries/allUsers.graphql'
// import updated from '@/graphql/events/subscriptions/updated.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allUsers }
  }),
  subscription('User', {
    // updated
  }),
  {
    namespaced: true
  }
)
