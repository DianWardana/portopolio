import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH diisi otomatis oleh GitHub Actions saat deploy.
// Kalau dijalankan lokal (npm run dev), nilainya '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
  },
})
