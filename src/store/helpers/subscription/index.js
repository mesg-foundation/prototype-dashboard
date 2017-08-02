import state from './state'
import getters from './getters'
import mutations from './mutations'
import generateActions from './actions'

export default (item, subscriptions = []) => ({
  state,
  mutations,
  getters,
  actions: generateActions(item, subscriptions)
})
