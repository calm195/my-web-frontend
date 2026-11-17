export interface FieldError {
  path: string
  message: string
}

export interface ApiErrorDetails {
  status: number
  code: string
  message: string
  fieldErrors?: FieldError[]
  requestId?: string
  retryAfter?: string | null
  currentGeneration?: number
  conflictId?: string
}

/** ApiError 表示服务端已经给出 HTTP 结果；409 必须由用户比较，不能自动覆盖。 */
export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly fieldErrors: FieldError[]
  readonly requestId: string | undefined
  readonly retryAfter: string | null
  readonly currentGeneration: number | undefined
  readonly conflictId: string | undefined

  constructor(details: ApiErrorDetails) {
    super(details.message)
    this.name = 'ApiError'
    this.status = details.status
    this.code = details.code
    this.fieldErrors = details.fieldErrors ?? []
    this.requestId = details.requestId
    this.retryAfter = details.retryAfter ?? null
    this.currentGeneration = details.currentGeneration
    this.conflictId = details.conflictId
  }
}

export type TransportErrorKind =
  'aborted' | 'timeout' | 'network' | 'invalid_response' | 'configuration'

/** ApiTransportError 区分主动取消、超时和无确定 HTTP 结果，不把超时等同于业务回滚。 */
export class ApiTransportError extends Error {
  readonly kind: TransportErrorKind
  readonly resultUncertain: boolean

  constructor(kind: TransportErrorKind, message: string, resultUncertain = false) {
    super(message)
    this.name = 'ApiTransportError'
    this.kind = kind
    this.resultUncertain = resultUncertain
  }
}
