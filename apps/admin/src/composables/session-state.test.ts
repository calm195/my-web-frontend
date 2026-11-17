import { describe, expect, it, vi } from 'vitest'
import { ApiError } from '@personal/api-client'
import type { Session } from '@personal/api-client'
import { createSessionState } from './session-state'

const session: Session = {
  user: { id: '01900000-0000-7000-8000-000000000001', username: 'owner' },
  csrf_token: 'test-csrf',
  expires_at: '2026-11-18T00:00:00Z',
}

function unauthorized() {
  return new ApiError({
    status: 401,
    code: 'AUTH_REQUIRED',
    message: '请先登录',
    fieldErrors: [],
    requestId: 'req-test',
  })
}

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

function makeApi() {
  return {
    getSession: vi.fn(async () => session),
    login: vi.fn(async () => session),
    logout: vi.fn(async () => {}),
  }
}

describe('管理会话状态', () => {
  it('后端明确返回 401 才清除身份，网络错误保持为待确认状态', async () => {
    const api = makeApi()
    const state = createSessionState(() => api)
    await state.refresh()
    api.getSession.mockRejectedValueOnce(new TypeError('network unavailable'))
    await state.refresh()
    expect(state.status.value).toBe('unavailable')
    expect(state.session.value?.user.username).toBe('owner')
    api.getSession.mockRejectedValueOnce(unauthorized())
    await state.refresh()
    expect(state.status.value).toBe('anonymous')
    expect(state.session.value).toBeNull()
  })

  it('退出成功后，较早的读取响应不能让会话复活', async () => {
    const api = makeApi()
    const state = createSessionState(() => api)
    await state.login({ username: 'owner', password: 'test-password' })
    const oldRead = deferred<Session>()
    api.getSession.mockReturnValueOnce(oldRead.promise)
    const refresh = state.refresh()
    await state.logout()
    oldRead.resolve(session)
    await refresh
    expect(state.status.value).toBe('anonymous')
    expect(state.session.value).toBeNull()
  })

  it('新登录不能被之前读取会话的 401 结果覆盖', async () => {
    const api = makeApi()
    const oldRead = deferred<Session>()
    api.getSession.mockReturnValueOnce(oldRead.promise)
    const state = createSessionState(() => api)
    const refresh = state.refresh()
    await state.login({ username: 'owner', password: 'test-password' })
    oldRead.reject(unauthorized())
    await refresh
    expect(state.authenticated.value).toBe(true)
  })

  it('退出响应不明时不伪造成功，明确 401 可以按已退出处理', async () => {
    const api = makeApi()
    const state = createSessionState(() => api)
    await state.refresh()
    api.logout.mockRejectedValueOnce(new TypeError('connection lost'))
    await expect(state.logout()).rejects.toThrow('connection lost')
    expect(state.authenticated.value).toBe(true)
    api.logout.mockRejectedValueOnce(unauthorized())
    await state.logout()
    expect(state.status.value).toBe('anonymous')
  })

  it('并发状态检查合并为一个请求，CSRF 总是取当前内存会话', async () => {
    const api = makeApi()
    const pending = deferred<Session>()
    api.getSession.mockReturnValueOnce(pending.promise)
    let getCsrf: () => string | undefined = () => undefined
    const state = createSessionState((getter) => {
      getCsrf = getter
      return api
    })
    const first = state.refresh()
    const second = state.refresh()
    expect(api.getSession).toHaveBeenCalledTimes(1)
    expect(getCsrf()).toBeUndefined()
    pending.resolve(session)
    await Promise.all([first, second])
    expect(getCsrf()).toBe('test-csrf')
    await state.logout()
    expect(getCsrf()).toBeUndefined()
  })

  it('其他标签退出后的强制核对不复用旧请求，也不接受旧响应', async () => {
    const api = makeApi()
    const state = createSessionState(() => api)
    await state.refresh()
    const staleRead = deferred<Session>()
    api.getSession.mockReturnValueOnce(staleRead.promise)
    const staleRefresh = state.refresh()
    api.getSession.mockRejectedValueOnce(unauthorized())
    await state.refresh(true)
    staleRead.resolve(session)
    await staleRefresh
    expect(state.status.value).toBe('anonymous')
    expect(api.getSession).toHaveBeenCalledTimes(3)
  })

  it('登录期间发起的核对不能覆盖已成功的新会话', async () => {
    const api = makeApi()
    const pendingLogin = deferred<Session>()
    const pendingRead = deferred<Session>()
    api.login.mockReturnValueOnce(pendingLogin.promise)
    api.getSession.mockReturnValueOnce(pendingRead.promise)
    const state = createSessionState(() => api)
    const login = state.login({ username: 'owner', password: 'test-password' })
    const check = state.refresh(true)
    pendingLogin.resolve(session)
    await login
    pendingRead.reject(unauthorized())
    await check
    expect(state.authenticated.value).toBe(true)
  })
})
