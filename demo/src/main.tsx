import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const root = createRoot(document.querySelector('#root')!, {
  onUncaughtError(error, errorInfo) {
    console.error(error, errorInfo)
  },
  onCaughtError(error, errorInfo) {
    console.error(error, errorInfo)
  },
})
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
