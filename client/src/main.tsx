// client/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom' // 1. Import this

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* 2. Wrap your App component */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)