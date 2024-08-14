import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import MatchProvider from "./api/userApi.tsx"

import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MatchProvider>
      <App/>
    </MatchProvider>
  </React.StrictMode>,
)
