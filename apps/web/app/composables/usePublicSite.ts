import { createApiClient } from '@personal/api-client'
import { useAsyncData, useRuntimeConfig } from '#imports'

export function usePublicSite() {
  const config = useRuntimeConfig()

  // client 在当前 Nuxt 请求内创建；公开 SSR 永远不转发入站 Cookie 或管理身份。
  const api = createApiClient({
    baseUrl: import.meta.server ? config.apiBaseUrl : '',
    credentials: 'omit',
  })

  // useAsyncData 的结果会进入公开页面 payload；这里只读取公开 DTO，不能加入身份或草稿。
  return useAsyncData('public-site', () => api.getPublicSite(), {
    deep: false,
  })
}
