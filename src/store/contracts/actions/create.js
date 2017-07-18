import client from '@/graphql'
import mutation from '@/graphql/contracts/mutations/create.graphql'

export default ({ commit, rootGetters }, data) => client()
  .mutate({
    mutation,
    variables: {
      ...data,
      projectId: rootGetters['session/currentProjectId']
    }
  })
  .then(result => result.data.createContract)
  .then(contract => {
    commit('updateItem', { item: contract })
    commit('projects/replaceItem', { item: contract.project }, { root: true })
    return contract
  })
