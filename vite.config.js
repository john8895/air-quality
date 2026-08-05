import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/moenv': {
        target: 'https://data.moenv.gov.tw',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/moenv/, ''),
      },
    },
  },
})
