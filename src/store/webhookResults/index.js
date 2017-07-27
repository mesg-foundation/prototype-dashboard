import allWebhookResults from '@/graphql/webhookResults/queries/allWebhookResults.graphql'
import { collection, subscription, merge } from '@/store/helpers'

const subscriptionsQueries = {
}

const subscriptionsVariables = getter => ({
  projectId: getter['session/currentProjectId']
})

export default merge({},
  collection({
    fetchAll: { allWebhookResults }
  }),
  subscription('WebhookResult', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true
  }
)
