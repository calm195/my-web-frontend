import type { components } from '../generated/schema'
import { ApiError, ApiTransportError } from './errors'
import type { ApiErrorDetails, FieldError } from './errors'

export type Session = components['schemas']['Session']
export type Login = components['schemas']['Login']
export type PublicSite = components['schemas']['PublicSite']

export interface ClientOptions {
  baseUrl?: string
  fetch?: typeof globalThis.fetch
  getCsrfToken?: () => string | null | undefined
  credentials?: RequestCredentials
  retryDelayMs?: number
}

export interface RequestControl {
  signal?: AbortSignal
  timeoutMs?: number
}

export interface RequestOptions extends RequestControl {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  idempotencyKey?: string
  responseType?: 'json' | 'text' | 'blob' | 'void'
}

export interface ApiResult<T> {
  data: T
  requestId: string | null
  replayed: boolean
  url: string
}

export interface ApiClient {
  getPublicSite(options?: RequestControl): Promise<PublicSite>
  getSession(options?: RequestControl): Promise<Session>
  login(credentials: Login, options?: RequestControl): Promise<Session>
  logout(options?: RequestControl): Promise<void>
  request<T>(path: string, options?: RequestOptions): Promise<ApiResult<T>>
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const sessionPath = '/api/v1/admin/session'

function configurationError(message: string): never {
  throw new ApiTransportError('configuration', message)
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toApiError(response: Response, value: unknown): ApiError {
  const body = isObject(value) ? value : {}
  const fields = Array.isArray(body.field_errors) ? body.field_errors : []
  const fieldErrors: FieldError[] = fields.filter(
    (field): field is FieldError =>
      isObject(field) && typeof field.path === 'string' && typeof field.message === 'string',
  )
  const details: ApiErrorDetails = {
    status: response.status,
    code: typeof body.code === 'string' ? body.code : 'HTTP_ERROR',
    message: typeof body.message === 'string' ? body.message : '服务暂时无法完成请求，请稍后重试。',
    fieldErrors,
    retryAfter: response.headers.get('Retry-After'),
  }
  const requestId = response.headers.get('X-Request-ID') ?? body.request_id
  if (typeof requestId === 'string') details.requestId = requestId
  if (typeof body.current_generation === 'number')
    details.currentGeneration = body.current_generation
  if (typeof body.conflict_id === 'string') details.conflictId = body.conflict_id
  return new ApiError(details)
}

/** delayWithAbort 在退避期间也响应用户取消，防止离开页面后再次发出请求。 */
function delayWithAbort(ms: number, signal?: AbortSignal, resultUncertain = false): Promise<void> {
  if (signal?.aborted)
    return Promise.reject(new ApiTransportError('aborted', '请求已取消。', resultUncertain))
  return new Promise((resolve, reject) => {
    const done = () => {
      signal?.removeEventListener('abort', aborted)
      resolve()
    }
    const timer = setTimeout(done, ms)
    const aborted = () => {
      clearTimeout(timer)
      signal?.removeEventListener('abort', aborted)
      reject(new ApiTransportError('aborted', '请求已取消。', resultUncertain))
    }
    signal?.addEventListener('abort', aborted, { once: true })
  })
}

/** createApiClient 创建请求客户端；公开 SSR 每次请求单独创建并禁用 Cookie。 */
export function createApiClient(config: ClientOptions = {}): ApiClient {
  const fetcher = config.fetch ?? globalThis.fetch.bind(globalThis)
  const baseUrl = (config.baseUrl ?? '').replace(/\/$/, '')
  const retryDelayMs = config.retryDelayMs ?? 200
  if (baseUrl) {
    let url: URL
    try {
      url = new URL(baseUrl)
    } catch {
      configurationError('API 上游地址无效。')
    }
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== '/'
    ) {
      configurationError('API 上游必须是固定 HTTP(S) 来源，不包含路径、凭据或查询参数。')
    }
  }
  if (!Number.isFinite(retryDelayMs) || retryDelayMs < 0) configurationError('请求退避时间无效。')

  async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResult<T>> {
    // 禁止绝对地址和相对越界，避免将 CSRF 或会话语义发送到调用方拼出的外部来源。
    const pathname = new URL(path, 'https://client.invalid').pathname
    if (
      !/^\/(api\/v1\/|media\/)/.test(path) ||
      !/^\/(api\/v1\/|media\/)/.test(pathname) ||
      path.includes('\\') ||
      /(^|\/)\.\.?([/?#]|$)/.test(path) ||
      /%2f|%5c/i.test(pathname) ||
      path.includes('#')
    ) {
      configurationError('请求路径必须位于本站 API 或受控资源目录。')
    }
    const method = options.method ?? 'GET'
    const isRead = method === 'GET'
    const barePath = path.split('?')[0]
    const isLogin = barePath === sessionPath && method === 'POST'
    const isSessionWrite = barePath === sessionPath && ['POST', 'DELETE'].includes(method)
    const isReadOnlyPost =
      method === 'POST' &&
      (barePath === '/api/v1/admin/preview' ||
        /^\/api\/v1\/admin\/taxonomy\/[^/]+\/impact$/.test(barePath ?? ''))
    const persistentWrite = !isRead && !isSessionWrite && !isReadOnlyPost
    if (persistentWrite && !uuidPattern.test(options.idempotencyKey ?? '')) {
      configurationError('持久写操作必须显式提供本次提交的 UUID 幂等键。')
    }
    if (isRead && options.body !== undefined) configurationError('GET 请求不能包含正文。')
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
    const timeoutMs = options.timeoutMs ?? (isRead ? 10_000 : isFormData ? 60_000 : 20_000)
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
      configurationError('请求超时必须是正毫秒数。')

    const headers = new Headers({
      Accept:
        options.responseType === 'blob'
          ? 'image/*'
          : options.responseType === 'text'
            ? 'text/plain'
            : 'application/json',
    })
    if (!isRead && barePath?.startsWith('/api/v1/admin/') && !isLogin) {
      const csrf = config.getCsrfToken?.()
      if (!csrf) configurationError('会话校验信息缺失，请先重新读取登录状态。')
      headers.set('X-CSRF-Token', csrf)
    }
    if (persistentWrite) headers.set('Idempotency-Key', options.idempotencyKey!)
    // 一次提交只序列化一次；重试不能读取已被表单编辑的新内容并复用旧幂等键。
    let body: string | FormData | undefined
    if (isFormData) {
      const snapshot = new FormData()
      for (const [key, value] of (options.body as FormData).entries()) snapshot.append(key, value)
      body = snapshot
    } else if (options.body !== undefined) {
      body = JSON.stringify(options.body)
    }
    if (body !== undefined && !isFormData) headers.set('Content-Type', 'application/json')

    // 无幂等保障的登录、退出和只读 POST 不能在结果不明时自动重试。
    const attempts = isRead ? 3 : persistentWrite ? 2 : 1
    for (let attempt = 0; attempt < attempts; attempt++) {
      if (options.signal?.aborted)
        throw new ApiTransportError('aborted', '请求已取消。', !isRead && attempt > 0)
      const controller = new AbortController()
      let timedOut = false
      const abort = () => controller.abort()
      options.signal?.addEventListener('abort', abort, { once: true })
      const timer = setTimeout(() => {
        timedOut = true
        controller.abort()
      }, timeoutMs)
      let failure: unknown
      try {
        const init: RequestInit = {
          method,
          headers,
          credentials: config.credentials ?? 'same-origin',
          cache: 'no-store',
          signal: controller.signal,
        }
        if (body !== undefined) init.body = body
        const response = await fetcher(baseUrl + path, init)
        if (!response.ok) {
          let errorBody: unknown
          try {
            errorBody = await response.json()
          } catch {
            /* 代理错误页不能直接显示为业务消息。 */
          }
          throw toApiError(response, errorBody)
        }
        let data: unknown
        if (response.status !== 204 && options.responseType !== 'void') {
          try {
            data =
              options.responseType === 'blob'
                ? await response.blob()
                : options.responseType === 'text'
                  ? await response.text()
                  : await response.json()
          } catch (error) {
            if (error instanceof SyntaxError)
              throw new ApiTransportError(
                'invalid_response',
                '服务响应格式异常，请重新读取当前状态。',
                !isRead,
              )
            throw error
          }
        }
        // 重放结果属于原提交，调用方必须读取最新状态，不能用旧响应覆盖后续修改。
        return {
          data: data as T,
          requestId: response.headers.get('X-Request-ID'),
          replayed: response.headers.get('Idempotency-Replayed') === 'true',
          url: response.url || baseUrl + path,
        }
      } catch (error) {
        if (options.signal?.aborted)
          failure = new ApiTransportError('aborted', '请求已取消。', !isRead)
        // 已收到明确 HTTP 错误时，即使错误正文读取超时，也不能把 401/409 当作网络故障重试。
        else if (error instanceof ApiError) failure = error
        else if (timedOut)
          failure = new ApiTransportError(
            'timeout',
            isRead ? '读取超时，请稍后重试。' : '提交结果待确认，请保留输入并读取当前状态。',
            !isRead,
          )
        else if (error instanceof ApiTransportError) failure = error
        else
          failure = new ApiTransportError(
            'network',
            isRead ? '无法连接服务，请检查网络。' : '提交结果待确认，请保留输入并读取当前状态。',
            !isRead,
          )
      } finally {
        clearTimeout(timer)
        options.signal?.removeEventListener('abort', abort)
      }
      const retryableTransport =
        failure instanceof ApiTransportError && ['network', 'timeout'].includes(failure.kind)
      const retryableHTTP = isRead && failure instanceof ApiError && failure.status === 503
      if (attempt + 1 >= attempts || (!retryableTransport && !retryableHTTP)) throw failure
      await delayWithAbort(retryDelayMs * 2 ** attempt, options.signal, !isRead)
    }
    throw new ApiTransportError('network', '请求未能完成。', !isRead)
  }

  return {
    request,
    getPublicSite: async (options) =>
      (await request<PublicSite>('/api/v1/public/site', options)).data,
    getSession: async (options) => (await request<Session>(sessionPath, options)).data,
    login: async (credentials, options) =>
      (await request<Session>(sessionPath, { ...options, method: 'POST', body: credentials })).data,
    logout: async (options) => {
      await request<void>(sessionPath, { ...options, method: 'DELETE', responseType: 'void' })
    },
  }
}
