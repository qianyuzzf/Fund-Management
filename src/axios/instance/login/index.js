import {http} from '@/axios'
import URL from '@/axios/urlConfig/index'

const login = {
  LOGIN_IN(data) {
    return http((axios) => axios.post(URL.LOGIN_IN, data), {
      success: '登陆成功！',
      error: '登陆失败！',
    })
  },
  LOGIN_OUT(data) {
    return http((axios) => axios.post(URL.LOGIN_OUT, data), {
      success: '退出登陆成功！',
      error: '退出登陆失败！',
    })
  },
  GET_USER_INFO(data) {
    return http((axios) => axios.post(URL.GET_USER_INFO, data), {
      success: '获取用户信息成功！',
      error: '获取用户信息失败！',
    })
  },
  GET_MENU_LIST() {
    return new Promise((resolve) => {
      resolve({
        status: 200,
        data: [
          {
            path: '/login',
            childRoutes: [
              {path: '/login/index'},
              {path: '/login/forget'},
            ],
          },
          {
            path: '/home',
            childRoutes: [
              {path: '/home/index'},
            ],
          },
          {
            path: '/customer',
            childRoutes: [
              {path: '/customer/index'},
            ],
          },
          {
            path: '/explore',
            childRoutes: [
              {path: '/explore/index'},
              {path: '/explore/article'},
              {path: '/explore/material'},
              {
                path: '/explore/competition',
                childRoutes: [
                  {path: '/explore/competition/index'},
                  {path: '/explore/competition/rankHistory/:id'},
                ],
              },
            ],
          },
        ],
      })
    })
  },
}

export default login
