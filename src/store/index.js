import _ from 'lodash'
import {createStore} from 'redux'
import modules from '@/store/modules/index'

const getInitState = () => {
  const state = {}
  const keys = _.keys(modules)
  _.forEach(keys, (item) => {
    state[item] = modules[item].state
  })
  return state
}

const defaultState = getInitState()

const store = (state, action) => {
  const app = {}
  const keys = _.keys(modules)
  _.forEach(keys, (item) => {
    if (action.type === 'RESET_STORE' && action.payload === item) {
      app[item] = defaultState[item]
    } else {
      app[item] = modules[item].reducer((state && state[item]) ? state[item] : getInitState()[item], action)
    }
  })
  return app
}

export default createStore(store)