import allUsers from '@/graphql/users/queries/allUsers.graphql'
import { collection, subscription, merge } from '@/store/helpers'

const subscriptionsQueries = {
}

const subscriptionsVariables = getter => ({
  projectId: getter['session/currentProjectId']
})

export default merge({},
  collection({
    fetchAll: { allUsers }
  }),
  subscription('User', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true
  }
)
