import { ApiError, ApiTransportError } from '@personal/api-client'

export function errorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 429) {
      return error.retryAfter
        ? `操作有些频繁，请等待 ${error.retryAfter} 秒后再试。`
        : '操作有些频繁，请稍后再试。'
    }
    return error.message
  }
  if (error instanceof ApiTransportError && error.kind === 'timeout') {
    return '请求超时，结果尚未确认。请检查连接后重试。'
  }
  return '暂时无法连接服务，请检查连接后重试。'
}
