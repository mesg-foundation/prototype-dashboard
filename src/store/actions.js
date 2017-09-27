import allActions from '@/graphql/actions/queries/allActions.graphql'
import action from '@/graphql/actions/queries/action.graphql'
import createAction from '@/graphql/actions/mutations/create.graphql'
import updateAction from '@/graphql/actions/mutations/update.graphql'
import Subscription from '@/graphql/actions/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allActions },
    fetch: { action },
    create: { createAction },
    update: { updateAction }
  }),
  subscription('Action', Subscription),
  {
    namespaced: true
  }
)
