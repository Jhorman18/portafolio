import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  cacheDir: mode === 'test' ? 'node_modules/.vite-tests' : 'node_modules/.vite',
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: { ecma: 2020, module: true, compress: { passes: 3 }, format: { comments: false } },
  },
  optimizeDeps: { include: ['react-icons/si', 'gsap/Flip'] },
}))
