# 个人网站前端

## 功能简介

公开站从 API 读取站名和简介，首页提供关于我、项目、技术博客、生活分享和留言板入口，各栏目目前展示引导页。站主可以从管理端登录、刷新页面恢复会话、查看登录状态并退出。

## 技术栈

公开站使用 Nuxt 4、Vue 3 和 TypeScript，在服务端渲染页面。管理端使用 Vue 3、Vue Router 和 Vite 8，浏览器通过同源 Go API 管理会话。两个应用通过 pnpm workspace 共用 API 客户端和样式变量。开发使用 Node 24.22.3 和 pnpm 12.21.0，依赖版本由本仓库锁定。[工具版本与脚本](package.json) · [依赖锁](pnpm-lock.yaml)

## 快速开始、验证与构建

**体验完整站点。** 首次检出时，在准备存放项目的目录执行以下命令。进入 `my-web/` 后，使用根仓库的 `./dev` 入口。

```sh
git clone --recurse-submodules git@github.com:calm195/my-web.git
cd my-web
./dev install
./dev up
```

按本地开发说明配置本地 CA 信任后，访问 `https://localhost:8443/` 浏览公开站，打开 `/admin/` 使用本地站主账号登录。运行 `./dev acceptance` 可在独立环境中验证真实浏览器和 HTTPS 接口。开发结束后，用 `./dev down` 停止上面启动的本地服务。[账号、证书与启动排错](../docs/development/local-development.md)

**单独开发前端。** 在前端仓库根目录、使用上面的 Node 和 pnpm 版本执行以下命令。类型检查、单测和构建使用仓库中已提交的接口类型。

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

`pnpm test` 运行共享客户端和管理端会话状态的单元测试。`pnpm build:web` 单独构建 Nuxt 服务，部署时保留整个 `apps/web/.output/`，Node 入口为 `server/index.mjs`。`pnpm build:admin` 生成 `apps/admin/dist/`，按 `/admin/` 路径提供静态文件。`pnpm build` 构建两者。[公开站配置](apps/web/nuxt.config.ts) · [管理端配置](apps/admin/vite.config.ts)

**更新接口类型。** 完整工作区从根目录执行 `./dev generate`，再执行 `./dev exec pnpm --dir frontend check` 检查生成结果、代码格式、lint 和类型。独立检出前端时，先取得本次交付对应的根仓库提交，在根目录运行 `git ls-tree HEAD frontend`，将记录的提交号与前端仓库的 `git rev-parse HEAD` 核对。从前端目录执行下列命令时，将路径换成该根提交的合同目录。生成器读取其中的 `openapi.yaml`，缺失时会报错。[根仓库](https://github.com/calm195/my-web) · [生成脚本](packages/api-client/scripts/generate.mjs)

```sh
SITE_CONTRACTS_DIR=/absolute/path/to/my-web/contracts pnpm generate:check
```

## 功能模块与目录

| 模块 | 职责 | 代码入口 |
| --- | --- | --- |
| 公开站 | 渲染访客页面。每次 SSR 请求创建公开客户端，只读取公开设置。 | [页面](apps/web/app/pages/) · [公开数据请求](apps/web/app/composables/usePublicSite.ts) |
| 站主管理端 | 提供登录、会话状态和退出交互。路由守卫根据会话状态决定进入管理页、登录页或连接状态页。 | [页面](apps/admin/src/views/) · [路由](apps/admin/src/router/index.ts) · [会话](apps/admin/src/composables/useSession.ts) |
| API 客户端 | 两个应用共用的类型和请求实现，统一处理 CSRF、取消、重试和业务错误。 | [客户端用法](packages/api-client/README.md) · [请求实现](packages/api-client/src/transport/) |
| 共享样式 | 提供公开站和管理端共用的 CSS 变量。 | [样式变量](packages/ui/src/tokens.css) |

## 文档导航

单独克隆或在 GitHub 浏览时，从[根仓库主页](https://github.com/calm195/my-web)进入共享文档和合同。下列跨仓库链接按递归检出后的目录组织。

- 修改登录或会话行为，见[站主登录与会话](../docs/development/owner-session.md)。
- 修改接口，见 [OpenAPI 合同](../contracts/openapi.yaml)和[前后端交互规则](../docs/design/interaction-contract.md)。
- 提交前检查，见[前端协作规范](AGENTS.md)和[公共编码规范](../CONTRIBUTING.md)。
- 验证前后端协作，见[本地联调规范](../docs/local-integration.md)和[本地 HTTPS 验收记录](../docs/verification/tools-2026-11-23.md)。
