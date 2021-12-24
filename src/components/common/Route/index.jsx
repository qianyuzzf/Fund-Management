import React from 'react'
import {Route as ReactRoute, Navigate} from 'react-router-dom'

const Route = (props) => {
  const {redirect, component, render, ...rest} = props

  const setDomTitle = () => {
    const {meta} = props
    if (meta && meta.title) {
      document.title = meta.title
    }
  }

  const renderRoute = (props2) => {
    const {path, render2, component: Component, redirect2, ...rest2} = props2
    if (typeof render2 === 'function') {
      setDomTitle()
      return render2(props2)
    }
    if (redirect2) {
      return <Navigate to={redirect2}/>
    }
    setDomTitle()
    return <Component {...rest2} {...props} path={path}/>
  }

  return <ReactRoute {...rest} render={renderRoute}/>
}

export default Route
