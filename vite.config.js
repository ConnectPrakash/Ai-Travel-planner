import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// For TS projects, you can also add vite-tsconfig-paths
// import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    // tsconfigPaths() // uncomment if using vite-tsconfig-paths
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
