import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const root = createRoot(document.querySelector('#root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
