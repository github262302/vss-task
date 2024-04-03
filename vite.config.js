import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === "build"
  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }, 
    base: isBuild ? "./" : '/',
    build:{
      outDir:"dist/render",
      rollupOptions:{
        input:{
          main: resolve(__dirname, 'index.html'),
          addproject: resolve(__dirname, 'addproject/index.html')
        }
      }
    }
  }
})
