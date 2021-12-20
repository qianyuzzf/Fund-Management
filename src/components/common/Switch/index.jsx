import {Routes, Redirect} from 'react-router-dom'
import _ from 'lodash'

const Switch = (props) => {
  const {routes, rootRedirect, ...others} = props || {}
  const getSwitch = (routes, others) => {
    return _.map(routes, (item) => {
      const {path, fullPath, component: Component, childRoutes, render, redirect, exact = true, ...rest} = item || {}
      let children
      if (childRoutes && childRoutes.length > 0) {
        children = getSwitch(childRoutes)
      }
      const newProps = {
        ...others,
        key: fullPath,
        path, fullPath,
        ...rest,
      }
    })
  }

  return (
    <Routes>
      {rootRedirect && <Redirect exact from='/' to={rootRedirect}/>}
    </Routes>
  )
}

export default Switch