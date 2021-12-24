import React from 'react'
import {Routes, Navigate} from 'react-router-dom'
import _ from 'lodash'
import RouteLayout from '@/components/common/RouteLayout'
import Route from '@/components/common/Route'

const Switch = (props) => {
  const {routes, rootRedirect, ...others} = props || {}

  const getSwitch = (routes2, others2) => _.map(routes2, (item) => {
    const {path, fullPath, component: Component, childRoutes, render, redirect, exact = true, ...rest} = item || {}
    let children
    if (childRoutes && childRoutes.length > 0) {
      children = getSwitch(childRoutes)
    }
    const newProps = {
      ...others2,
      key: fullPath,
      path, fullPath,
      ...rest,
    }

    // 渲染优先级
    // render 函数存在则优先使用 render 函数绘制
    // 存在根节点的情况下,如果 component 配置组件存在,则使用 Component 绘制,否则使用通用的 RouteLayout
    // 其他情况用 route 绘制
    const redirectValue = () => {
      if (redirect) {
        return <Navigate exact from={path} to={redirect}/>
      }
      return null
    }
    if (render) {
      return render({...newProps, redirect, component: Component})
    }
    if (children) {
      if (Component) {
        return <Component exact={exact} {...newProps}/>
      }
      return (
        <RouteLayout
          className={`page-container ${path.replace(':', '').replace(/\/(w+)/g, '$1-')}container`} {...newProps}>
          {children}
          {redirectValue()}
        </RouteLayout>)
    }
    return <Route component={Component} render={render} exact={exact} redirect={redirect} {...newProps}/>
  })

  return (
    <Routes>
      {getSwitch(routes, others)}
      {rootRedirect && <Navigate exact from='/' to={rootRedirect}/>}
    </Routes>
  )
}

export default Switch