import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Context from '@/components/index'
import Switch from '@/components/common/Switch'

const App = (props) => {
  const {login} = props || {}
  const {routes} = login || {}
  const navigate = useNavigate()

  useEffect(() => {
    window.currentReactHistory = navigate
  }, [navigate])

  return (
    <Context>
      <Switch routes={routes} rootRedirect='/login/index'/>
    </Context>
  )
}

export default App
