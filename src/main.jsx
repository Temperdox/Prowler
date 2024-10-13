import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SplashPage from './splashPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SplashPage />
  </StrictMode>,
)
