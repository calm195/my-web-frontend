import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/admin/',
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: Number(process.env.SITE_ADMIN_PORT || 5173),
    strictPort: true,
    // 浏览器统一从 HTTPS 入口进入，开发热更新也经过该入口，不能绕开代理。
    ws: {
      protocol: 'wss',
      host: 'localhost',
      clientPort: Number(process.env.SITE_HTTPS_PORT || 8443),
    },
    headers: { 'Cache-Control': 'no-store' },
  },
  build: { sourcemap: false },
})
