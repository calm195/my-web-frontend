import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApiClient } from './client'
import { ApiError, ApiTransportError } from './errors'

const site = { title: '一隅', description: '技术与生活', timezone: 'Asia/Shanghai' }
const session = {
  user: { id: '019c0000-0000-7000-8000-000000000001', username: 'owner' },
  csrf_token: 'test-csrf',
  expires_at: '2026-11-18T00:00:00Z',
}
const key = '019c0000-0000-7000-8000-000000000002'
function json(value: unknown, status = 200, headers: HeadersInit = {}): Response {
  const responseHeaders = new Headers(headers)
  responseHeaders.set('Content-Type', 'application/json')
  return new Response(JSON.stringify(value), { status, headers: responseHeaders })
}
const failure = (status: number) =>
  json(
    {
      code: 'VALIDATION_FAILED',
      message: '请检查输入。',
      field_errors: [{ path: '/title', message: '标题不能为空。' }],
      request_id: 'body-request',
      current_generation: 9,
    },
    status,
    { 'X-Request-ID': 'header-request', 'Retry-After': '60' },
  )

afterEach(() => vi.useRealTimers())

describe('会话与公开读取', () => {
  it('公开 SSR 使用固定上游且不携带 Cookie 或 CSRF', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(json(site))
    const client = createApiClient({
      baseUrl: 'http://127.0.0.1:8080',
      credentials: 'omit',
      fetch: fetcher,
    })
    expect(await client.getPublicSite()).toEqual(site)
    const [url, init] = fetcher.mock.calls[0]!
    expect(url).toBe('http://127.0.0.1:8080/api/v1/public/site')
    expect(init?.credentials).toBe('omit')
    expect(init?.cache).toBe('no-store')
    const headers = new Headers(init?.headers)
    expect(headers.has('Cookie')).toBe(false)
    expect(headers.has('X-CSRF-Token')).toBe(false)
  })

  it('登录不发送 CSRF 或幂等键，后续会话读取返回原始 DTO', async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => json(session))
    const client = createApiClient({ fetch: fetcher })
    expect(await client.login({ username: 'owner', password: 'test-only-password' })).toEqual(
      session,
    )
    expect(await client.getSession()).toEqual(session)
    const init = fetcher.mock.calls[0]![1]
    expect(init?.credentials).toBe('same-origin')
    expect(new Headers(init?.headers).has('X-CSRF-Token')).toBe(false)
    expect(new Headers(init?.headers).has('Idempotency-Key')).toBe(false)
  })

  it('退出携带当前 CSRF，204 不尝试解析 JSON', async () => {
    const response = new Response(null, { status: 204 })
    const parse = vi.spyOn(response, 'json')
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(response)
    const client = createApiClient({ fetch: fetcher, getCsrfToken: () => session.csrf_token })
    expect(await client.logout()).toBeUndefined()
    expect(parse).not.toHaveBeenCalled()
    const headers = new Headers(fetcher.mock.calls[0]![1]?.headers)
    expect(headers.get('X-CSRF-Token')).toBe('test-csrf')
    expect(headers.has('Idempotency-Key')).toBe(false)
  })

  it('缺 CSRF 时拒绝管理写入，登录或退出网络失败不自动重试', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    await expect(createApiClient({ fetch: fetcher }).logout()).rejects.toMatchObject({
      kind: 'configuration',
    })
    expect(fetcher).not.toHaveBeenCalled()
    const client = createApiClient({ fetch: fetcher, getCsrfToken: () => 'test-csrf' })
    await expect(client.login({ username: 'owner', password: 'test' })).rejects.toMatchObject({
      kind: 'network',
      resultUncertain: true,
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
    await expect(client.logout()).rejects.toMatchObject({ kind: 'network' })
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})

describe('受控重试与幂等', () => {
  it('GET 只对网络故障及 503 重试，最多两次', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError('offline'))
      .mockResolvedValueOnce(failure(503))
      .mockResolvedValueOnce(json(site))
    expect(await createApiClient({ fetch: fetcher, retryDelayMs: 0 }).getPublicSite()).toEqual(site)
    expect(fetcher).toHaveBeenCalledTimes(3)
    const alwaysOffline = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    await expect(
      createApiClient({ fetch: alwaysOffline, retryDelayMs: 0 }).getPublicSite(),
    ).rejects.toMatchObject({ kind: 'network' })
    expect(alwaysOffline).toHaveBeenCalledTimes(3)
  })

  it.each([400, 401, 403, 404, 409, 422, 429, 500])(
    'HTTP %i 保留错误细节且不自动重试',
    async (status) => {
      const fetcher = vi.fn<typeof fetch>().mockResolvedValue(failure(status))
      await expect(
        createApiClient({ fetch: fetcher, retryDelayMs: 0 }).getSession(),
      ).rejects.toMatchObject({
        status,
        code: 'VALIDATION_FAILED',
        requestId: 'header-request',
        fieldErrors: [{ path: '/title', message: '标题不能为空。' }],
        currentGeneration: 9,
        retryAfter: '60',
      })
      expect(fetcher).toHaveBeenCalledTimes(1)
    },
  )

  it('持久写必须显式提供幂等键；超时重试复用原键和原载荷', async () => {
    const payload = { expected_generation: 7, title: '旧输入' }
    const fetcher = vi
      .fn<typeof fetch>()
      .mockImplementationOnce(async () => {
        payload.title = '编辑中的新输入'
        throw new TypeError('connection closed')
      })
      .mockResolvedValueOnce(json({ id: 'saved' }, 201, { 'Idempotency-Replayed': 'true' }))
    const client = createApiClient({
      fetch: fetcher,
      getCsrfToken: () => 'test-csrf',
      retryDelayMs: 0,
    })
    await expect(
      client.request('/api/v1/admin/contents', { method: 'POST', body: payload }),
    ).rejects.toMatchObject({ kind: 'configuration' })
    const result = await client.request('/api/v1/admin/contents', {
      method: 'POST',
      body: payload,
      idempotencyKey: key,
    })
    expect(result.replayed).toBe(true)
    expect(fetcher).toHaveBeenCalledTimes(2)
    for (const [, init] of fetcher.mock.calls) {
      expect(new Headers(init?.headers).get('Idempotency-Key')).toBe(key)
      expect(JSON.parse(init?.body as string)).toEqual({ expected_generation: 7, title: '旧输入' })
    }
  })

  it('409 不更新 generation、不自动重放；503 写响应也不盲目重试', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(failure(409))
      .mockResolvedValueOnce(failure(503))
    const client = createApiClient({
      fetch: fetcher,
      getCsrfToken: () => 'test-csrf',
      retryDelayMs: 0,
    })
    const body = { expected_generation: 7 }
    await expect(
      client.request('/api/v1/admin/contents/id/draft', {
        method: 'PUT',
        body,
        idempotencyKey: key,
      }),
    ).rejects.toBeInstanceOf(ApiError)
    expect(body.expected_generation).toBe(7)
    expect(fetcher).toHaveBeenCalledTimes(1)
    await expect(
      client.request('/api/v1/admin/contents/id/draft', {
        method: 'PUT',
        body,
        idempotencyKey: key,
      }),
    ).rejects.toMatchObject({ status: 503 })
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('持续网络失败的持久写最多两次，保留结果不明状态', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    const client = createApiClient({ fetch: fetcher, retryDelayMs: 0 })
    await expect(
      client.request('/api/v1/public/comments', { method: 'POST', body: {}, idempotencyKey: key }),
    ).rejects.toMatchObject({ kind: 'network', resultUncertain: true })
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('只读 POST 仍校验 CSRF，但不添加幂等键或重试', async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => json({ html: '' }))
    const client = createApiClient({ fetch: fetcher, getCsrfToken: () => 'test-csrf' })
    await client.request('/api/v1/admin/preview', { method: 'POST', body: {} })
    await client.request('/api/v1/admin/taxonomy/id/impact', { method: 'POST', body: {} })
    for (const [, init] of fetcher.mock.calls) {
      const headers = new Headers(init?.headers)
      expect(headers.get('X-CSRF-Token')).toBe('test-csrf')
      expect(headers.has('Idempotency-Key')).toBe(false)
    }
  })

  it('上传快照不会随原 FormData 在重试期间变化，不设置 multipart 边界', async () => {
    const body = new FormData()
    body.append('label', '初始名称')
    const fetcher = vi
      .fn<typeof fetch>()
      .mockImplementationOnce(async () => {
        body.set('label', '后来修改')
        throw new TypeError('offline')
      })
      .mockResolvedValueOnce(json({ sha256: 'test' }))
    await createApiClient({
      fetch: fetcher,
      getCsrfToken: () => 'test-csrf',
      retryDelayMs: 0,
    }).request('/api/v1/admin/media', { method: 'POST', body, idempotencyKey: key })
    for (const [, init] of fetcher.mock.calls) {
      expect((init?.body as FormData).get('label')).toBe('初始名称')
      expect(new Headers(init?.headers).has('Content-Type')).toBe(false)
    }
  })
})

describe('取消、超时与响应边界', () => {
  const pendingFetch = () =>
    vi.fn<typeof fetch>().mockImplementation(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener(
            'abort',
            () => reject(new DOMException('aborted', 'AbortError')),
            { once: true },
          )
        }),
    )

  it('已取消请求不发送；进行中取消会终止 fetch 且不重试', async () => {
    const controller = new AbortController()
    const fetcher = pendingFetch()
    const client = createApiClient({ fetch: fetcher })
    const result = client.getSession({ signal: controller.signal }).catch((error) => error)
    controller.abort()
    expect(await result).toMatchObject({ kind: 'aborted' })
    expect(fetcher).toHaveBeenCalledTimes(1)
    await expect(client.getSession({ signal: controller.signal })).rejects.toMatchObject({
      kind: 'aborted',
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('超时与取消分开表示，登录超时不自动重复且结果待确认', async () => {
    vi.useFakeTimers()
    const fetcher = pendingFetch()
    const result = createApiClient({ fetch: fetcher })
      .login({ username: 'owner', password: 'test' }, { timeoutMs: 50 })
      .catch((error) => error)
    await vi.advanceTimersByTimeAsync(50)
    expect(await result).toMatchObject({ kind: 'timeout', resultUncertain: true })
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('退避期间取消后不再发下一次请求', async () => {
    vi.useFakeTimers()
    const controller = new AbortController()
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    const result = createApiClient({ fetch: fetcher })
      .getSession({ signal: controller.signal })
      .catch((error) => error)
    await vi.advanceTimersByTimeAsync(0)
    controller.abort()
    expect(await result).toMatchObject({ kind: 'aborted' })
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('写入结果不明后的退避取消仍保留结果待确认标记', async () => {
    vi.useFakeTimers()
    const controller = new AbortController()
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    const result = createApiClient({ fetch: fetcher })
      .request('/api/v1/public/comments', {
        method: 'POST',
        body: {},
        idempotencyKey: key,
        signal: controller.signal,
      })
      .catch((error) => error)
    await vi.advanceTimersByTimeAsync(0)
    controller.abort()
    expect(await result).toMatchObject({ kind: 'aborted', resultUncertain: true })
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('错误页不显示原始 HTML；成功但非法 JSON 不进行网络重试', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response('<html>internal path</html>', { status: 502 }))
      .mockResolvedValueOnce(new Response('not-json', { status: 200 }))
    const client = createApiClient({ fetch: fetcher, retryDelayMs: 0 })
    await expect(client.getSession()).rejects.toMatchObject({ status: 502, code: 'HTTP_ERROR' })
    await expect(client.getSession()).rejects.toMatchObject({ kind: 'invalid_response' })
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it.each([
    'https://elsewhere.test/api/v1/site',
    '//elsewhere.test/api/v1/site',
    '/api/v1/../../other',
    '/api/v1/%2e%2e/%2e%2e/other',
    '/api/v1/admin%2fsecret',
  ])('拒绝越界请求 %s', async (path) => {
    const fetcher = vi.fn<typeof fetch>()
    await expect(createApiClient({ fetch: fetcher }).request(path)).rejects.toBeInstanceOf(
      ApiTransportError,
    )
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('响应类型支持文本与 Blob，保留 request id 和规范地址', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response('plain', { headers: { 'X-Request-ID': 'text-request' } }))
      .mockResolvedValueOnce(new Response(new Blob(['image'], { type: 'image/png' })))
    const client = createApiClient({ fetch: fetcher })
    const result = await client.request<string>('/api/v1/public/site', { responseType: 'text' })
    expect(result).toMatchObject({
      data: 'plain',
      requestId: 'text-request',
      url: '/api/v1/public/site',
    })
    expect(
      (await client.request<Blob>('/media/hash/thumb', { responseType: 'blob' })).data,
    ).toBeInstanceOf(Blob)
  })
})
