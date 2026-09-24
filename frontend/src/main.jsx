import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Site from './Site.jsx'
import Admin from './admin/Admin.jsx'
import { STATIC_SITE } from './api.js'

// The editor needs the Spring Boot backend, so it doesn't exist in the GitHub Pages build.
const isAdmin = !STATIC_SITE && window.location.pathname.replace(/\/+$/, '') === '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>{isAdmin ? <Admin /> : <Site />}</StrictMode>,
)
