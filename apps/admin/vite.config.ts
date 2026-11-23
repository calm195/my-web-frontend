import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/admin/',
  // 联调缓存随运行目录隔离，避免并行环境复用不同端口的编译配置。
  cacheDir: process.env.SITE_VITE_CACHE_DIR || 'node_modules/.vite',
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
