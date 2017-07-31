import allProjects from '@/graphql/projects/queries/allProjects.graphql'
import createProject from '@/graphql/projects/mutations/create.graphql'
import updateProject from '@/graphql/projects/mutations/update.graphql'
import { collection, subscription, merge } from '@/store/helpers'
// import actions from './actions'

const subscriptionsQueries = {
}

const subscriptionsVariables = getter => ({
  currentUserId: getter['session/currentUserId']
})

export default merge({},
  collection({
    fetchAll: { allProjects },
    create: { createProject },
    update: { updateProject }
  }),
  subscription('Project', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true
    // actions
  }
)
