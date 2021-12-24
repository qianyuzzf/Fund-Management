import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {Toast} from 'antd-mobile'
import _ from 'lodash'
import {validSafePath, checkPermissions, getFullPathRoutes, getPermissions} from '@/utils/permissions'
import routes from '@/router/index'
import H from '@/utils/helper'

const systemRoutes = getFullPathRoutes(_.cloneDeep(routes))

const Context = (props) => {
  const [isInit, setIsInit] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const doCheckPermissions = (routes2 = props.routes) => {
    const flag = checkPermissions(location.pathname, systemRoutes, routes2)
    if (flag !== true) {
      if (flag === '403') {
        navigate('/exception/403', {replace: true})
      } else if (flag === '404') {
        navigate('/exception/404', {replace: true})
      }
    } else {
      setIsInit(true)
    }
  }

  const doSetTruthPermissions = () => {
    const {SET_USER_INFO, SET_MENU_LIST, SET_ROUTES, SET_IS_LOGIN} = props || {}
    // 获取权限数据,并存入全局变量
    return new Promise((resolve, reject) => {
      getPermissions(
        {
          setUserInfo: SET_USER_INFO,
          setMenuList: SET_MENU_LIST,
          setRoutes: SET_ROUTES,
          setIsLogin: SET_IS_LOGIN,
        },
        ({targetRoutes}) => {
          resolve(targetRoutes)
        },
        (msg) => {
          Toast.show({
            icon: 'fail',
            content: msg,
          })
          reject()
        }
      )
    })
  }

  const doSetPermissions = () => {
    const pathname = location.pathname.toLowerCase()
    // 特殊路径相关直接豁免
    if (validSafePath(pathname)) {
      setIsInit(true)
      // 判断是否获取过权限相关数据
    } else if (props.isLogin) {
      // 获取过就直接判断是否有权限访问
      doCheckPermissions()
    } else {
      // 没获取过就先获取权限数据,再判断是否有访问权限
      doSetTruthPermissions().then((routes2) => {
        doCheckPermissions(routes2)
      })
    }
  }

  useEffect(() => {
    setIsInit(false)
    doSetPermissions()
  }, [location])

  return isInit && props.children
}

const mapStateToProps = (state) => ({
  ...state.login,
})

const mapDispatchToProps = (reducer) => ({
  ...reducer.loginReducer,
})

export default H.$store.connect('login', mapStateToProps, mapDispatchToProps)(Context)