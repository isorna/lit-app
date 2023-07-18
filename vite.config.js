import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    host: 'wardice.local'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
  // TO DO:
  // ,
  // build: {
  //   rollupOptions: {
  //     // https://rollupjs.org/guide/en/#outputmanualchunks
  //     output: {
  //       manualChunks: {}
  //     }
  //   }
  // }
})