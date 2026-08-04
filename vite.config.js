import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/futo-icpc-sav-portal/' : '/',
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 800,
    },
  },
}))