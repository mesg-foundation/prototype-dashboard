import allWebhooks from '@/graphql/webhooks/queries/allWebhooks.graphql'
import Webhook from '@/graphql/webhooks/queries/webhook.graphql'
import createWebhook from '@/graphql/webhooks/mutations/create.graphql'
import updateWebhook from '@/graphql/webhooks/mutations/update.graphql'
import updated from '@/graphql/webhooks/subscriptions/updated.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allWebhooks },
    fetch: { Webhook },
    create: { createWebhook },
    update: { updateWebhook }
  }),
  subscription('Webhook', {
    updated
  }),
  {
    namespaced: true
  }
)
