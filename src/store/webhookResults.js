import allWebhookResults from '@/graphql/webhookResults/queries/allWebhookResults.graphql'
import Subscription from '@/graphql/webhookResults/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allWebhookResults }
  }),
  subscription('WebhookResult', Subscription),
  {
    namespaced: true
  }
)
