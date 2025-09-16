import tailwindcss from '@tailwindcss/vite'; // <-- Import the plugin
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


export default defineConfig({

  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://student-hub-backend-sc62.onrender.com',
        changeOrigin: true,
      },
    },
  },
})

