import state from './state'
import getters from './getters'
import mutations from './mutations'
import actionsCreator from './actions'

export default (actions = {}) => ({
  actions: actionsCreator(actions),
  state,
  getters,
  mutations
})
