# 共享 API 客户端

类型唯一来源为根协调仓库的 [contracts/openapi.yaml](../../../contracts/openapi.yaml)，前端不维护副本。默认从生成脚本位置推导该目录，也可用绝对路径 `SITE_CONTRACTS_DIR` 指定同一合同目录；合同不存在时生成和漂移检查明确失败。独立构建及单测使用已提交生成类型。`src/generated/schema.ts` 由 `pnpm --filter @personal/api-client generate` 生成，`generate:check` 检查生成漂移；不手工维护另一份 DTO。

生成脚本使用官方 Node API 的 `openapiTS` 与 `astToString`，直接读取本地合同，不请求远程 schema。[官方 Node API 说明](https://openapi-ts.dev/node)

`createApiClient({ baseUrl, fetch, getCsrfToken, credentials })` 提供 `getPublicSite`、`getSession`、`login`、`logout`，直接返回合同 DTO。浏览器默认同源并采用 `credentials: 'same-origin'`；公开 SSR 每请求创建客户端，指定固定 Go 来源与 `credentials: 'omit'`，不得转发管理员 Cookie。

通用 `request<T>(path, options)` 返回 `{ data, requestId, replayed, url }`。持久写由表单为一次提交生成 UUID 幂等键，网络重试使用原键及输入快照；编辑输入后调用方生成新键。看到 `replayed` 必须重新查询当前状态，不能让旧响应覆盖后来的修改。

- GET 仅在网络故障、超时或 503 时最多重试两次；持久写仅在网络结果不明时最多重试一次；登录、退出、只读 POST 不重试。
- HTTP 401/403/409/422/429 等返回 `ApiError`，保留字段错误、request id、Retry-After 和冲突版本；不修改 generation、不自动重登或覆盖输入。
- `ApiTransportError.kind` 区分主动取消、超时、网络、响应格式和配置问题；写入的 `resultUncertain` 提醒调用方保留输入并查询当前状态。
- 每次尝试默认查询 10 秒、普通写 20 秒、上传 60 秒，可用 `timeoutMs` 覆盖；`signal` 在请求和退避阶段都有效。
- 204 不解析正文；文本、Blob 通过 `responseType` 显式选择。multipart 的 Content-Type 及边界交给浏览器生成。

类型检查包括 `type-tests/schema-contract.ts`：生成器保留内容 discriminator、评论目标 oneOf 及请求字段形状，但不完整表达 `ResolveConflict` 的 JSON Schema `if/then/else`。UUID、长度、数值范围、条件字段和发布完整性仍需后端运行时校验；类型检查无法替代已有 JSON Schema 正反例或服务校验。

`pnpm --filter @personal/api-client test` 使用受控 fetch 进行单元测试，验证实际适配器的取消、重试、输入快照、CSRF 和错误行为；它不代表本地 HTTPS 或真实后端联调已通过。
