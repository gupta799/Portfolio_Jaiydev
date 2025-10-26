import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Enable SPA fallback for client-side routing
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },
})
