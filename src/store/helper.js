import _ from 'lodash'
import {connect as ReduxConnect} from 'react-redux'
import store from '@/store/index'
import {getType, convertToArray} from '@/utils/common'
import modules from '@/store/modules'

/**
 * 通过入参创建 connect 高阶函数
 * 例如：通过 connect({store: login})(Component)，可以将 state 和 reducer 以属性键值 store 为别名通过 props 传图组件
 * 在 Component 组件中，可以通过 this.props.store 来访问 login 模块的 state
 * 在 Component 组件中，可以通过 this.props['store[SET_USER_INFO]']({userId: '1'}) 来访问更改 login 模块的 store 的 state.userInfo 的值
 * @param {string|array|object} target
 * @param {any} mapState
 * @param {any} mapDispatch
 * @returns {any} 高阶函数
 */
const connect = (target, mapState, mapDispatch) => {
  const type = getType(target)
  const modulesArray = convertToArray(modules)
  let result = []
  if (type === 'string') {
    if (target !== 'all') {
      const targetArray = target.split(',')
      result = _.filter(modulesArray, (item) => targetArray.includes(item.value))
    } else {
      result = modulesArray
    }
  } else if (type === 'array') {
    _.forEach(target, (item) => {
      const type2 = getType(item)
      let key = null
      let value = null
      if (type2 === 'string') {
        key = item
        value = item
      } else if (type2 === 'object') {
        key = item.label
        value = item.value
      }
      if (key && value) {
        const row = _.find(modulesArray, (item) => item.value === value)
        if (row) {
          result.push({
            ...row,
            key,
          })
        }
      }
    })
  } else if (type === 'object') {
    for (const key in target) {
      const row = _.find(modulesArray, (item) => item.value === target[key])
      if (row) {
        result.push({
          ...row,
          key,
        })
      }
    }
  } else {
    throw new Error('H.$store.connect ---> do not support arguments[0]')
  }

  const mapStateToProps = (state) => {
    let result2 = {}
    _.forEach(result, (item) => {
      result2[item.key] = state[item.value]
    })
    typeof mapState === 'function' && (result2 = mapState(result2))
    return result2
  }

  const mapDispatchToProps = (dispatch) => {
    let result2 = {}
    _.forEach(result, (item) => {
      const uiKey = item.key + 'Reducer'
      const types = item.label.types || {}
      /**
       * 注入默认 RESET_STORE 方法，用于重置该模块的 state
       * 一般用于整个页面离开的时候，请勿滥用
       */
      result2[uiKey] = {
        RESET_STORE() {
          dispatch({
            type: 'RESET_STORE',
            payload: item.key,
          })
        },
      }
      for (const key in types) {
        result2[uiKey][key] = (payload) => {
          const action = {
            type: types[key],
            payload,
          }
          dispatch(action)
        }
      }
    })
    typeof mapDispatch === 'function' && (result2 = mapDispatch(result2, dispatch))
    return result2
  }
  return ReduxConnect(mapStateToProps, mapDispatchToProps)
}

const newStore = {
  store,
  connect,
}

export default newStore