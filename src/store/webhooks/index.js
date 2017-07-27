import created from '@/graphql/webhooks/subscriptions/created.graphql'
import updated from '@/graphql/webhooks/subscriptions/updated.graphql'
import removed from '@/graphql/webhooks/subscriptions/deleted.graphql'
import allWebhooks from '@/graphql/webhooks/queries/allWebhooks.graphql'
import webhook from '@/graphql/webhooks/queries/webhook.graphql'
import createWebhook from '@/graphql/webhooks/mutations/create.graphql'
import { collection, subscription, merge } from '@/store/helpers'

const subscriptionsQueries = {
  created,
  updated,
  removed
}

const subscriptionsVariables = getter => ({
  projectId: getter['session/currentProjectId']
})

export default merge({},
  collection({
    fetchAll: { allWebhooks },
    fetch: { webhook },
    create: { createWebhook }
  }),
  subscription('Webhook', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true
  }
)
