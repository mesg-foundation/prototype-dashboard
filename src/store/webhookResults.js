import allWebhookResults from '@/graphql/webhookResults/queries/allWebhookResults.graphql'
import created from '@/graphql/webhookResults/subscriptions/created.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allWebhookResults }
  }),
  subscription('WebhookResult', {
    created
  }),
  {
    namespaced: true
  }
)
