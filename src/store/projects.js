import allProjects from '@/graphql/projects/queries/allProjects.graphql'
import createProject from '@/graphql/projects/mutations/create.graphql'
import updateProject from '@/graphql/projects/mutations/update.graphql'
import updated from '@/graphql/projects/subscriptions/updated.graphql'
import { collection, subscription, merge } from '@/store/helpers'

export default merge({},
  collection({
    fetchAll: { allProjects },
    create: { createProject },
    update: { updateProject }
  }),
  subscription('Project', [
    updated
  ]),
  {
    namespaced: true
  }
)
