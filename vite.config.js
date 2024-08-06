import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This will expose the server to the network
    port: 5173 // Ensure this matches the port you expose in your Dockerfile and docker-compose
  }
})
