import allEvents from '@/graphql/events/queries/allEvents.graphql'
import Event from '@/graphql/events/queries/event.graphql'
import createEvent from '@/graphql/events/mutations/create.graphql'
import Subscription from '@/graphql/events/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allEvents },
    fetch: { Event },
    create: { createEvent }
  }),
  subscription('Event', Subscription),
  {
    namespaced: true
  }
)
