/**
 * main.jsx  (UPDATED — SEO)
 * ─────────────────────────────────────────────────────────────────────────────
 * Added:  HelmetProvider from react-helmet-async
 * Install: npm install react-helmet-async
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'  // ← ADD THIS
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>          {/* ← WRAP EVERYTHING */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>,
)
