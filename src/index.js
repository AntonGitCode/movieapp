import React from 'react'
import ReactDOM from 'react-dom/client'
import { GuestSessionProvider } from './GuestSessionContext'
import './index.css'
import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <GuestSessionProvider>
    <App />
  </GuestSessionProvider>
)
