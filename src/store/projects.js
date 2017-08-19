import allProjects from '@/graphql/projects/queries/allProjects.graphql'
import createProject from '@/graphql/projects/mutations/create.graphql'
import updateProject from '@/graphql/projects/mutations/update.graphql'
import Subscription from '@/graphql/projects/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allProjects },
    _create: { createProject },
    update: { updateProject }
  }),
  subscription('Project', Subscription),
  {
    namespaced: true,
    actions: {
      async createAndSelect ({ commit, dispatch }, { variables, config = {} }) {
        const project = await dispatch('_create', { variables, config })
        dispatch('session/changeProject', { project }, { root: true })
        return project
      }
    }
  }
)
