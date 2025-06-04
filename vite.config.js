import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification for production builds
    minify: 'terser',
    // Configure Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'react-icons', 'react-hot-toast'],
          'supabase': ['@supabase/supabase-js']
        }
      }
    },
    // Generate source maps for production (can be disabled for smaller files)
    sourcemap: false,
    // Ensure we don't run into memory issues during build
    chunkSizeWarningLimit: 1000
  }
})
