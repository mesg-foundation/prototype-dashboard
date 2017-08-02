const AVAILABLE_ACTIONS = ['updated', 'created']

export default (item, actions) => {
  if (!item) { throw new Error('Item need to be defined') }
  const validAction = action => AVAILABLE_ACTIONS.indexOf(action) >= 0
  const validActions = actions => Object.keys(actions).reduce((prev, action) => prev && validAction(action), true)
  if (!validActions(actions)) { throw new Error(`Actions for subscriptions needs to be one or many of thoses ${AVAILABLE_ACTIONS}`) }
  return true
}
