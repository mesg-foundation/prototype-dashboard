import allContracts from '@/graphql/contracts/queries/allContracts.graphql'
import createContract from '@/graphql/contracts/mutations/create.graphql'
import Contract from '@/graphql/contracts/queries/contract.graphql'
import { collection, subscription, merge } from '@/store/helpers'

const subscriptionsQueries = {
}

const subscriptionsVariables = getter => ({
  projectId: getter['session/currentProjectId']
})

export default merge({},
  collection({
    fetchAll: { allContracts },
    fetch: { Contract },
    create: { createContract }
  }),
  subscription('Contract', subscriptionsQueries, subscriptionsVariables),
  {
    namespaced: true
  }
)
