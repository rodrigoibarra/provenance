import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@provenance/schemas': fileURLToPath(new URL('../packages/schemas/dist/index.js', import.meta.url))
    },
    dedupe: ['vue']
  },
  optimizeDeps: {
    include: ['@provenance/schemas']
  }
})
