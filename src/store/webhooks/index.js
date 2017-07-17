import created from '@/graphql/webhooks/subscriptions/created.graphql'
import updated from '@/graphql/webhooks/subscriptions/updated.graphql'
import removed from '@/graphql/webhooks/subscriptions/deleted.graphql'
import { collection, subscription, merge } from '@/store/helpers'
import actions from './actions'

const subscriptionsQueries = {
  created,
  updated,
  removed
}

const subscriptionsVariables = getter => ({
  projectId: getter['session/currentProjectId']
})

export default merge({},
  collection(),
  subscription('Webhook', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true,
    actions
  }
)
