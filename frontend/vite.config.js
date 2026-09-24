import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Two build targets:
//  - default: `npm run dev` proxies /api to Spring Boot on :8080, and `npm run build`
//    writes into Spring Boot's static folder so the jar serves everything.
//  - `npm run build:pages`: a static build for GitHub Pages (no backend). Content is
//    bundled from the seed JSON, the contact form falls back to email, and /admin is off.
export default defineConfig(({ mode }) => {
  const pages = mode === 'pages'
  return {
    plugins: [react()],
    base: pages ? '/NikhilsPortfolio/' : '/',
    define: {
      __STATIC_SITE__: JSON.stringify(pages),
    },
    server: {
      proxy: {
        '/api': 'http://localhost:8080',
      },
    },
    build: pages
      ? { outDir: 'dist', emptyOutDir: true }
      : { outDir: '../backend/src/main/resources/static', emptyOutDir: true },
  }
})
