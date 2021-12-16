import _ from 'lodash'
import {notCheckPath} from '@/configs'
import login from '@/axios/instance/login/index'
import {deepLeafFilter, deepEach} from '@/utils/common'
import routes from '@/router/index'

/**
 * 获取带有全路径的路由配置
 * @param {array} routes
 * @param {string} pre
 * @returns
 */
export const getFullPathRoutes = (routes, pre = '') => {
  const result = []
  _.forEach(routes, (item) => {
    item.fullPath = (pre ? pre + '/' : '') + item.path
    if (item.childRoutes && item.childRoutes.length > 0) {
      item.childRoutes = getFullPathRoutes(item.childRoutes, item.fullPath)
    }
    result.push(item)
  })
  return result
}

/**
 * 获取用户信息
 * @param {function} setUserInfo
 * @returns
 */
export const getUserInfo = (setUserInfo) => {
  return new Promise((resolve, reject) => {
    login.GET_USER_INFO().then((resp) => {
      if (resp.status === 200) {
        typeof setUserInfo === 'function' && setUserInfo(resp.data || {})
        resolve(resp.data || {})
      } else {
        reject(resp.msg || resp.message)
      }
    })
  })
}

/**
 * 获取菜单信息
 * @param {object} userInfo
 * @param {object} param1
 * @returns
 */
export const getMenuList = (userInfo, {setMenuList, setRoutes}) => {
  return new Promise((resolve, reject) => {
    login.GET_MENU_LIST({
      param: {
        userId: userInfo.userId,
      }
    }).then((resp) => {
      if (resp.status === 200) {
        const menuList = resp.data || []
        const targetRoutes = getPermissionsMenuList(routes, menuList)
        typeof setMenuList === 'function' && setMenuList(menuList)
        typeof setRoutes === 'function' && setRoutes(targetRoutes)
        resolve({
          menuList,
          targetRoutes,
        })
      } else {
        reject(resp.msg || resp.message)
      }
    })
  })
}

/**
 * 根据后端返回的菜单数据 menuList 获取当前的 routes 配置
 * @param {array} routes
 * @param {array} menuList
 * @returns
 */
export const getPermissionsMenuList = (routes, menuList = []) => {
  const withFullPathRoutes = getFullPathRoutes(_.cloneDeep(routes))
  const menuListMap = {}
  deepLeafFilter(
    menuList,
    (item) => {
      if (item.path) {
        menuListMap[item.path.toLowerCase()] = true
      }
    },
    'childRoutes',
  )
  return deepLeafFilter(
    withFullPathRoutes,
    (item) => {
      return item.fullPath && (menuListMap[item.fullPath.toLowerCase()] || validSafePath(item.fullPath))
    },
    'childRoutes',
  )
}

/**
 * 通用获取权限信息
 * @param {object} param0
 * @param {function} fn
 * @param {function} failFn
 */
export const getPermissions = ({setUserInfo, setMenuList, setRoutes, setIsLogin}, fn, failFn) => {
  getUserInfo(setUserInfo).then((resp) => {
    getMenuList(resp, {
      setMenuList,
      setRoutes,
    }).then((menuList, targetRoutes) => {
      setIsLogin(true)
      typeof fn === 'function' && fn(menuList, targetRoutes)
    }).catch((resp) => {
      typeof failFn === 'function' && failFn(resp)
    })
  }).catch((resp) => {
    typeof failFn === 'function' && failFn(resp)
  })
}

/**
 * 是否是不用校验权限的 path
 * @param {string} path
 * @returns
 */
export const validSafePath = (path) => {
  const target = _.find(notCheckPath, (item) => {
    if (item.exact) {
      return path === item.path
    } else {
      return path.startsWith(item.path)
    }
  })
  return !!target
}

/**
 * 根据路由路径生成正则表达式
 * @param {string} path
 * @returns {RegExp} 正则表达式
 */
export const createRegexpByPath = (path) => {
  if (!path) {
    throw new Error('createRegexpByPath ---> path must be passed')
  } else {
    const array = _.map(path.replace('\\', '/').split('/'), (item) => {
      if (item.startsWith(':')) {
        return '(\\w+)'
      }
      return item
    })
    const string = '^' + array.join('[\\\\|\\/]') + '$'
    return new RegExp(string, 'i')
  }
}

/**
 * 根据全局的 routes 变量,判断传入路径是否有权限访问
 * @param {string} path
 * @param {array} oriRoutes
 * @param {array} routes
 * @returns
 */
export const checkPermissions = (path, oriRoutes, routes) => {
  if (!path || validSafePath(path)) {
    return true
  }
  let isOriValid = false
  let isValid = false
  deepEach(
    oriRoutes,
    (item) => {
      const reg = createRegexpByPath(item.fullPath)
      isOriValid = isOriValid || reg.test(path)
    },
    'childRoutes'
  )
  deepEach(
    routes,
    (item) => {
      const reg = createRegexpByPath(item.fullPath)
      isValid = isValid || reg.test(path)
    },
    'childRoutes'
  )
  return isOriValid ? (isValid ? true : '403') : '404'
}