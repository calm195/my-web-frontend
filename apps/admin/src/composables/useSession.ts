import { createApiClient } from '@personal/api-client'
import { createSessionState } from './session-state'

// 此模块仅在管理 SPA 使用，公开 Nuxt SSR 不导入，防止共享管理身份到公开 payload。
const state = createSessionState((getCsrfToken) => createApiClient({ getCsrfToken }))
let channel: BroadcastChannel | null = null

export function useSession() {
  return state
}

/** announceSessionChange 只广播状态变化事件，不广播 token、账号或表单输入。 */
export function announceSessionChange() {
  channel?.postMessage('session-changed')
}

/** observeSession 在页面重新可见时核对后端会话，不用后台心跳无限延长空闲期限。 */
export function observeSession() {
  let lastFocusCheck = 0
  const refreshVisible = () => {
    if (document.visibilityState !== 'visible') return
    if (Date.now() - lastFocusCheck < 1000) return
    lastFocusCheck = Date.now()
    void state.refresh()
  }
  if ('BroadcastChannel' in window) {
    channel = new BroadcastChannel('personal-site-session')
    channel.onmessage = (event: MessageEvent<unknown>) => {
      if (event.data === 'session-changed') void state.refresh(true)
    }
  }
  window.addEventListener('focus', refreshVisible)
  document.addEventListener('visibilitychange', refreshVisible)

  return () => {
    window.removeEventListener('focus', refreshVisible)
    document.removeEventListener('visibilitychange', refreshVisible)
    channel?.close()
    channel = null
  }
}
