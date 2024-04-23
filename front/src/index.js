import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import AuthProvider from './context/AuthProvider'
import HttpHeadersProvider from './context/HttpHeadersProvider'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <HttpHeadersProvider>
    <App />
    </HttpHeadersProvider>
    </AuthProvider>
  </Provider>,
)
