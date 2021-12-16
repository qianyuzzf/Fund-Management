import {useNavigate} from "react-router-dom"
import {useEffect} from 'react'

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.currentReactHistory = navigate
  }, [navigate])

  return (
    <div className="App">
      Hello, world!
    </div>
  )
}

export default App
