import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Context} from '@/components/index'

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.currentReactHistory = navigate
  }, [navigate])

  return (
    <Context>
      <div className="App">
        Hello, world!
      </div>
    </Context>
  )
}

export default App
