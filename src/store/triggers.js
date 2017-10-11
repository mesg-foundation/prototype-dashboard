import allTriggers from '@/graphql/triggers/queries/allTriggers.graphql'
import Trigger from '@/graphql/triggers/queries/trigger.graphql'
import createTrigger from '@/graphql/triggers/mutations/create.graphql'
import updateTrigger from '@/graphql/triggers/mutations/update.graphql'
import deleteTrigger from '@/graphql/triggers/mutations/delete.graphql'
import Subscription from '@/graphql/triggers/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allTriggers },
    fetch: { Trigger },
    create: { createTrigger },
    update: { updateTrigger },
    delete: { deleteTrigger }
  }),
  subscription('Trigger', Subscription),
  {
    namespaced: true
  }
)
