import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/blue_lagoon/",
  test: {
    globals:true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
})
