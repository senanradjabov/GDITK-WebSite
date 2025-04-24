import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    minify: 'esbuild', // по умолчанию esbuild, можно указать явно
    sourcemap: false, // можно true, если хочешь дебажить прод
    outDir: 'dist',   // это по умолчанию, но можно явно указать
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@consts': path.resolve(__dirname, './src/consts'),
    },
  },
})
