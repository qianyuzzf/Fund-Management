import React from 'react'
import {Routes} from 'react-router-dom'

const RouteLayout = (props) => {
  const {className, children} = props
  return (
    <div className={className}>
      <Routes>{children}</Routes>
    </div>
  )
}

export default RouteLayout
