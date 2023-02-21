import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from './redux/store'

import Content from './components/Content'
import './App.css'

function App () {
 
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  )
}

export default App
