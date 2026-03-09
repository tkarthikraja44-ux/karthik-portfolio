import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js + drei is ~700kb+ minified by nature — raise limit to suppress noise
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — always needed, cached aggressively
          'vendor-react': ['react', 'react-dom'],
          // Animation engines — large but stable
          'vendor-gsap': ['gsap'],
          'vendor-framer': ['framer-motion'],
          // Three.js + ecosystem — heaviest, only needed for 3D scene
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
