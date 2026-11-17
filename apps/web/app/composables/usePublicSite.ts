import { createApiClient } from '@personal/api-client'
import { useAsyncData, useRuntimeConfig } from '#imports'

export function usePublicSite() {
  const config = useRuntimeConfig()

  // client 在当前 Nuxt 请求内创建；公开 SSR 永远不转发入站 Cookie 或管理身份。
  const api = createApiClient({
    baseUrl: import.meta.server ? config.apiBaseUrl : '',
    credentials: 'omit',
  })

  return useAsyncData('public-site', () => api.getPublicSite(), {
    deep: false,
  })
}
