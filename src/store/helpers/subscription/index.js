import client from '@/graphql'
import defaultStore from './defaultStore'
import guard from './guard'
import mutationFromEvent from './mutationFromEvent'
import { _listener, _subscribeTo, _eventListener } from './naming'

export default (item, actions = {}) => guard(item, actions) && Object.keys(actions)
  .reduce((acc, action) => ({ ...acc,
    state: { ...acc.state,
      [_listener(action)]: null
    },
    getters: { ...acc.getters,
      [_eventListener(action)]: state => state[action]
    },
    actions: { ...acc.actions,
      [_subscribeTo(action)]: ({ commit, rootGetters }, variables) => commit('addListener', {
        action,
        listener: client()
          .subscribe({ query: actions[action], variables })
          .subscribe({
            next: event => commit(mutationFromEvent(item, event), { item: event[item].node })
          })
      })
    }
  }), { ...defaultStore(actions) })
