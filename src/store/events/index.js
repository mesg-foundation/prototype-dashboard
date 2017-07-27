import allEvents from '@/graphql/events/queries/allEvents.graphql'
import event from '@/graphql/events/queries/event.graphql'
import createEvent from '@/graphql/events/mutations/create.graphql'
import { collection, subscription, merge } from '@/store/helpers'

const subscriptionsQueries = {
}

const subscriptionsVariables = getter => ({
  projectId: getter['session/currentProjectId']
})

export default merge({},
  collection({
    fetchAll: { allEvents },
    fetch: { event },
    create: { createEvent }
  }),
  subscription('Event', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true
  }
)
