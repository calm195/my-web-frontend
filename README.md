# 个人网站前端

独立 Git 仓库，作为根工作区的 `frontend/` 子模块维护。包含 Nuxt 公开站、Vue 管理端和共享客户端/UI；需求、接口和设计统一放在根仓库 [docs/](../docs/) 与 [contracts/](../contracts/)，开发约束见 [AGENTS.md](AGENTS.md)。

## 安装与独立验证

使用 Node 24.22.3、pnpm 12.21.0；依赖版本和锁文件均在本仓库。以下命令从前端仓库根目录执行：

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

`pnpm build:web` 和 `pnpm build:admin` 分别生成公开站 `.output/` 与管理端 `dist/`，不需要读取后端源码或运行 Go。生成类型已经提交，因此单独检出可以安装、类型检查、单测和构建；需要真实 API 的页面验证由根工作区完成。

位于完整工作区时，可使用根仓库已固定的工具链，例如从根目录执行 `./dev exec pnpm --dir frontend check`。首次安装和联调见 [P1 本地开发说明](../docs/development/p1-local.md)。

## 合同生成

```sh
pnpm generate
pnpm generate:check
pnpm check
```

默认从脚本所在位置定位根仓库 `contracts/openapi.yaml`，与当前 shell 目录无关。独立检出需要指定同一根仓库合同目录的绝对路径，例如：

```sh
SITE_CONTRACTS_DIR=/absolute/path/to/my-web/contracts pnpm generate:check
```

`check` 包含合同漂移检查、lint、格式和类型；合同缺失时明确失败，不自动下载或使用另一份合同。修改生成源后提交生成类型，本仓库不维护合同副本。

前端服务与跨服务测试由根仓库统一启动和停止；同源 HTTPS、Cookie、CSRF 与证书规则见 [本地联调规范](../docs/local-integration.md)。
