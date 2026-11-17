import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-17',
  devtools: { enabled: false },
  css: ['@personal/ui/tokens.css', '~/assets/site.css'],
  typescript: { strict: true },
  runtimeConfig: {
    // 上游只留在服务端 runtimeConfig，不能放入 public 并泄露内部服务地址。
    apiBaseUrl: 'http://127.0.0.1:8080',
  },
  devServer: {
    host: '127.0.0.1',
    port: Number(process.env.SITE_WEB_PORT || 3000),
  },
  vite: {
    server: {
      ws: {
        protocol: 'wss',
        host: 'localhost',
        clientPort: Number(process.env.SITE_HTTPS_PORT || 8443),
      },
    },
  },
  routeRules: {
    // 动态页面不缓存，防止后续撤回内容后仍从 HTML 或 payload 取到旧正文。
    '/**': { headers: { 'Cache-Control': 'no-store' } },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
})
