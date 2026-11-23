# 前端开发与代理规范

适用范围：本前端 Git 子模块及全部子目录。更新日期：2026-11-23。

- 本仓库包含 Nuxt 公开站、Vue 管理端、共享 API 客户端与 UI token。公共规范、需求和设计统一遵循根仓库的 [AGENTS.md](../AGENTS.md)、[CONTRIBUTING.md](../CONTRIBUTING.md) 和 [docs/](../docs/)。单独检出时先取得对应根工作区，不复制或另建合同与设计文档。
- 接口唯一来源为根仓库 [contracts/openapi.yaml](../contracts/openapi.yaml)。从该文件生成 `packages/api-client/src/generated/schema.ts`，不手改生成结果，不读取后端数据库或根据内部结构猜测 DTO。
- `apps/web` 仅公开渲染，SSR 每请求隔离公开客户端，不转发管理员 Cookie。`apps/admin` 使用同源 API、内存会话与统一 transport；会话失效保留未保存输入，不向 localStorage 写私密内容。
- TypeScript strict；组件 PascalCase；Vue 与 TypeScript 关键业务边界使用中文注释。请求取消、重试、幂等、CSRF、公开/私密隔离及会话竞态必须说明设计原因，并与逻辑同步更新。
- 参考 [Vue 风格指南](https://vuejs.org/style-guide/)、[Vue SSR 指南](https://vuejs.org/guide/scaling-up/ssr.html)和 [Vue 安全指南](https://vuejs.org/guide/best-practices/security)：避免 SSR 模块级可变状态跨请求共享，不将不可信文本作为模板，仅由统一正文组件渲染后端清洗的 HTML。Nuxt 公开数据及其 payload 都按公开信息处理；框架认证示例不得覆盖本项目不转发管理员 Cookie 的约束。
- 参考 [TypeScript 配置说明](https://www.typescriptlang.org/tsconfig/)及 [Vite 环境变量说明](https://vite.dev/guide/env-and-mode)：严格类型检查按工程实际配置维护，额外严格选项先评估兼容性与生成类型；`VITE_` 及 Nuxt public 配置会暴露给客户端，禁止存放凭据。优先使用现有 ESLint、Prettier、类型检查和生成漂移检查，新增规则或工具先核验覆盖范围与误报。
- `apps/` 放两个应用；`packages/api-client/` 放类型和请求适配；`packages/ui/` 放真实共享样式与基础组件。不引入 Java，不在 Nuxt server 内实现业务 API。
- Node、pnpm 与依赖版本以 `.nvmrc`、`package.json`、`pnpm-lock.yaml` 为准，使用冻结锁文件安装。`node_modules` 与构建产物不得提交。
- 合同生成与漂移检查需根工作区，默认读取相邻根仓库 `contracts/`，也可用绝对路径 `SITE_CONTRACTS_DIR` 指定同一合同目录。构建、类型检查和单元测试使用已提交生成类型，允许在单独检出的前端仓库执行。
- 修改前检查本子仓库分支与工作区，不覆盖其他修改。只修改任务分配的文件；合同与根文档由根仓库负责人统一维护，多个代理不能同时修改锁文件或客户端。
- 提交前运行相关 lint、格式、类型、单元测试和构建；合同变更运行 `generate:check`。本地 HTTPS 与浏览器验收由根仓库编排，前端单测或构建通过不能替代全链路验收。
- 本仓库提交完成后，由根仓库提交子模块指针；推送时子仓库先于根仓库。不得自行推送、部署或修改其他仓库。
