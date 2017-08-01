import allUsers from '@/graphql/users/queries/allUsers.graphql'
import createdOrUpdated from '@/graphql/events/subscriptions/createdOrUpdated.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allUsers }
  }),
  subscription('User', {
    created: createdOrUpdated,
    updated: createdOrUpdated
  }),
  {
    namespaced: true
  }
)
