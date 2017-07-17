import { collection, subscription, merge } from '@/store/helpers'
import actions from './actions'

const subscriptionsQueries = {
}

const subscriptionsVariables = getter => ({
  currentUserId: getter['session/currentUserId']
})

export default merge({},
  collection(),
  subscription('Project', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true,
    actions
  }
)
