import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux"
import {BrowserRouter} from 'react-router-dom'
import H from '@/utils/helper'
import App from '@/App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={H.$store.store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
