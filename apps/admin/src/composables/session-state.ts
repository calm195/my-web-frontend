import { computed, readonly, ref, shallowRef } from 'vue'
import { ApiError } from '@personal/api-client'
import type { Login, Session } from '@personal/api-client'

type SessionStatus = 'unknown' | 'checking' | 'authenticated' | 'anonymous' | 'unavailable'

interface SessionApi {
  getSession(): Promise<Session>
  login(credentials: Login): Promise<Session>
  logout(): Promise<void>
}

/** createSessionState 将管理会话保存在当前页面内存中，不写入浏览器持久存储。 */
export function createSessionState(makeApi: (getCsrf: () => string | undefined) => SessionApi) {
  const session = shallowRef<Session | null>(null)
  const status = ref<SessionStatus>('unknown')
  const lastError = shallowRef<unknown>(null)
  const api = makeApi(() => session.value?.csrf_token)
  let epoch = 0
  let readSequence = 0
  let refreshing: Promise<void> | null = null

  function acceptSession(value: Session) {
    session.value = value
    status.value = 'authenticated'
    lastError.value = null
  }

  function forgetSession() {
    session.value = null
    status.value = 'anonymous'
    lastError.value = null
  }

  async function refresh(force = false) {
    if (refreshing && !force) return refreshing
    // 其他标签已改变会话时，必须发起较新的核对；复用旧读取可能错过退出结果。
    const currentEpoch = epoch
    const currentRead = ++readSequence
    if (status.value === 'unknown') status.value = 'checking'

    const operation: Promise<void> = (async () => {
      try {
        const value = await api.getSession()
        // 登录/退出发生后，较早的 GET 不能重新恢复已经失效的会话或覆盖新身份。
        if (currentEpoch === epoch && currentRead === readSequence) acceptSession(value)
      } catch (error) {
        if (currentEpoch !== epoch || currentRead !== readSequence) return
        if (error instanceof ApiError && error.status === 401) {
          forgetSession()
        } else {
          lastError.value = error
          status.value = 'unavailable'
        }
      } finally {
        if (currentRead === readSequence) refreshing = null
      }
    })()
    refreshing = operation
    return operation
  }

  async function login(credentials: Login) {
    const currentEpoch = ++epoch
    const value = await api.login(credentials)
    if (currentEpoch === epoch) {
      // 登录完成时再次使并行读取过期，避免发起登录期间的匿名 GET 覆盖新会话。
      epoch += 1
      acceptSession(value)
    }
  }

  async function logout() {
    const currentEpoch = ++epoch
    try {
      await api.logout()
    } catch (error) {
      // 退出时后端已无会话等价于完成退出；网络错误不能假装服务端已清除 Cookie。
      if (!(error instanceof ApiError && error.status === 401)) throw error
    }
    if (currentEpoch === epoch) {
      epoch += 1
      forgetSession()
    }
  }

  return {
    session: readonly(session),
    status: readonly(status),
    lastError: readonly(lastError),
    authenticated: computed(() => status.value === 'authenticated'),
    refresh,
    login,
    logout,
  }
}
