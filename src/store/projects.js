import allProjects from '@/graphql/projects/queries/allProjects.graphql'
import createProject from '@/graphql/projects/mutations/create.graphql'
import updateProject from '@/graphql/projects/mutations/update.graphql'
import deleteProject from '@/graphql/projects/mutations/delete.graphql'
import Subscription from '@/graphql/projects/subscription.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allProjects },
    _create: { createProject },
    update: { updateProject },
    _delete: { deleteProject }
  }),
  subscription('Project', Subscription),
  {
    namespaced: true,
    actions: {
      async createAndSelect ({ commit, dispatch }, graphQLConfig) {
        const project = await dispatch('_create', graphQLConfig)
        dispatch('session/changeProject', { project }, { root: true })
        return project
      },
      async delete ({ commit, dispatch, getters }, graphQLConfig) {
        const project = await dispatch('_delete', graphQLConfig)
        const defaultProject = getters.collection[Object.keys(getters.collection)[0]]
        dispatch('session/changeProject', { project: defaultProject }, { root: true })
        commit('deleteItem', project)
        return project
      }
    }
  }
)
