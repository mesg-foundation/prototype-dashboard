import webhookCreated from '@/graphql/subscriptions/webhookCreated.graphql'
import webhookUpdated from '@/graphql/subscriptions/webhookUpdated.graphql'
import webhookDeleted from '@/graphql/subscriptions/webhookDeleted.graphql'
import { collection, subscription, merge } from '@/store/helpers'
import actions from './actions'

const subscriptionsQueries = {
  created: webhookCreated,
  updated: webhookUpdated,
  removed: webhookDeleted
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
