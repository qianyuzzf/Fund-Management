import _ from 'lodash'
import {combineReducers} from 'redux'
import {getFullPathRoutes, validSafePath} from '@/utils/permissions'
import systemRoutes from '@/router/index'

const initState = {
  isLogin: false,
  userInfo: {},
  menuList: [],
  routes: getFullPathRoutes(_.cloneDeep(_.filter(systemRoutes, (item) => validSafePath(item.path))))
}

const types = {
  SET_IS_LOGIN: 'SET_IS_LOGIN',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_MENU_LIST: 'SET_MENU_LIST',
  SET_ROUTES: 'SET_ROUTES',
}

const isLogin = (state = initState.isLogin, action) => {
  switch (action.type) {
    case types.SET_IS_LOGIN:
      return action.payload
    default:
      return state
  }
}

const userInfo = (state = initState.userInfo, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return action.payload
    default:
      return state
  }
}

const menuList = (state = initState.menuList, action) => {
  switch (action.type) {
    case types.SET_MENU_LIST:
      return action.payload
    default:
      return state
  }
}

const routes = (state = initState.routes, action) => {
  switch (action.type) {
    case types.SET_ROUTES:
      return action.payload
    default:
      return state
  }
}

const login = {
  state: initState,
  types,
  reducer: combineReducers({
    isLogin,
    userInfo,
    menuList,
    routes,
  }),
}

export default login