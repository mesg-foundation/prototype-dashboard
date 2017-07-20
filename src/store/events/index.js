import { collection, subscription, merge } from '@/store/helpers'
import actions from './actions'

const subscriptionsQueries = {
}

const subscriptionsVariables = getter => ({
  projectId: getter['session/currentProjectId']
})

export default merge({},
  collection(),
  subscription('Event', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true,
    actions
  }
)
