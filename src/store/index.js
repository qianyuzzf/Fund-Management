import {createStore} from 'redux'
import modules from '@/store/modules/index'

const getInitState = () => {
  const state = {}
  for (const key in modules) {
    state[key] = modules[key].state
  }
  return state
}

const defaultState = getInitState()

const store = (state = getInitState(), action) => {
  const app = {}
  for (const key in modules) {
    if (action.type === 'RESET_STORE' && action.payload === key) {
      app[key] = defaultState[key]
    } else {
      app[key] = modules[key].reducer(state[key], action)
    }
  }
  return app
}

export default createStore(store)