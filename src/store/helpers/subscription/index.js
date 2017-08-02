import state from './state'
import mutations from './mutations'
import generateActions from './actions'

export default (item, subscriptions = []) => ({
  state,
  mutations,
  actions: generateActions(item, subscriptions)
})
