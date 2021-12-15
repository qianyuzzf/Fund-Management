import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      /**
       * 路径别名：若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径
       */
      '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [react()]
})
