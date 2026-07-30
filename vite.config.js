import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/futo-icpc-sav-portal/',
  plugins: [react()],
})