import {lazy} from 'react'

const route = [
  {
    path: '/login',
    redirect: '/login/index',
    childRoutes: [
      {
        path: 'index',
        component: lazy(() => import('@/views/login/pages/index/index')),
        meta: {
          title: '请登录',
        }
      },
      {
        path: 'forget',
        component: lazy(() => import('@/views/login/pages/forget/index')),
        meta: {
          title: '忘记密码',
        }
      },
    ],
  }
]

export default route