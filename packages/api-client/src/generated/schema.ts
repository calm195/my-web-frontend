// 此文件由 OpenAPI 合同生成，请修改合同后重新生成，不要手工编辑。
export interface paths {
    "/api/v1/public/site": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取公开站点设置
         * @description 读取公开站点设置
         */
        get: operations["getPublicSite"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/home": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取首页组合内容
         * @description 每类文章最多 6 篇，精选项目最多 6 个；所有字段只来自公开版本。
         */
        get: operations["getPublicHome"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/articles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 文章列表与标题摘要搜索
         * @description 筛选条件取 AND；first_published_at DESC,id DESC；不搜索正文。返回结果只用当前公开版本。
         */
        get: operations["listPublicArticles"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/articles/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取公开文章
         * @description 旧 slug 且内容仍公开时 308 到规范 API 路径，Location 同源；未公开或不存在均 404。Nuxt 同步将页面旧链接重定向到 canonical_path。
         */
        get: operations["getPublicArticle"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/projects": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取公开项目列表
         * @description display_order ASC,first_published_at DESC,id DESC。
         */
        get: operations["listPublicProjects"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/projects/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取公开项目详情
         * @description 旧 slug 的处理同文章详情；项目不接受评论。
         */
        get: operations["getPublicProject"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取公开个人资料
         * @description 读取公开个人资料
         */
        get: operations["getPublicProfile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/skills": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取公开技能
         * @description display_order ASC,id ASC；返回 kind=skill 的详情，相关内容只投影仍公开的目标。
         */
        get: operations["listPublicSkills"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/taxonomy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取已公开文章使用的分类标签
         * @description 仅含公开文章引用的标签；不返回草稿专用标签。公开 DTO 不应包含管理元数据，使用 PublicTaxonomies schema。
         */
        get: operations["listPublicTaxonomy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/sitemap": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取站点地图条目
         * @description 包含六个静态公开入口和当前公开文章/项目规范路径；不包含搜索结果、管理端、草稿、旧别名；Nuxt 生成 XML。
         */
        get: operations["listSitemapEntries"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取公开根留言
         * @description 文章范围必须传 content_id；留言板禁止 content_id。根留言按创建时间倒序，回复另行分页，隐藏整组不计入 total。
         */
        get: operations["listPublicThreads"];
        put?: never;
        /**
         * 提交匿名评论或回复
         * @description 事务中校验文章、根留言及回复目标仍公开；昵称不能决定站主身份。幂等响应只含公开字段。
         */
        post: operations["createVisitorComment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/public/comments/{id}/replies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取根留言下平铺回复
         * @description id 必须是公开根留言；回复按 created_at ASC,id ASC。不可见目标统一 404。
         */
        get: operations["listPublicReplies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/media/{sha256}/{variant}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取当前公开内容引用的图片
         * @description 每次校验当前公开引用；不可公开 404。派生图未就绪时返回原图，Content-Type 按实际文件，前端保持原比例。
         */
        get: operations["getPublicMedia"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/session": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取当前站主会话
         * @description 读取当前站主会话
         */
        get: operations["getSession"];
        put?: never;
        /**
         * 站主登录
         * @description 校验 Origin/Referer 与登录限频。此接口无现存会话、无需 CSRF 或幂等键；不自动重试登录。
         */
        post: operations["login"];
        /**
         * 退出并使当前会话失效
         * @description 校验 CSRF 后删除当前会话并清 Cookie；不使用幂等记录重放失效会话。已失效返回 401，前端仍可清理登录状态。
         */
        delete: operations["logout"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/dashboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取后台概览
         * @description 读取后台概览
         */
        get: operations["getDashboard"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询内容与回收站
         * @description 默认 lifecycle=active；后台标题优先展示修改稿，仅后台搜索范围内使用。updated_at DESC,id DESC。
         */
        get: operations["listAdminContents"];
        put?: never;
        /**
         * 创建内容及首份修改稿
         * @description 创建内容及首份修改稿
         */
        post: operations["createContent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取内容公开版、修改稿与同步状态
         * @description 读取内容公开版、修改稿与同步状态
         */
        get: operations["getAdminContent"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/draft": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * 保存完整修改稿
         * @description 在同一事务插入不可变版本、CAS 更新 generation、写 outbox；不影响公开指针。trash 状态拒绝。
         */
        put: operations["saveDraft"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/discard-draft": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 丢弃当前修改稿
         * @description 保留历史版本和公开版本；新内容丢弃后仍为未发布空对象。
         */
        post: operations["discardDraft"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/publish": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 发布选定版本
         * @description 校验完整性、渲染和图片就绪；提交本地事务后公开成功，sync 独立为 pending/failed 等状态，不等待 Git。
         */
        post: operations["publishContent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 撤回公开内容
         * @description 所有类型可撤回；保留最后公开版本及修改稿。
         */
        post: operations["withdrawContent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/trash": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 移入回收站
         * @description 仅 article/project；立即下线，保留内容、历史、评论及资源。
         */
        post: operations["trashContent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/restore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 恢复为未发布
         * @description 仅回收站 article/project；保留稳定 id，visibility 必须为 unpublished。
         */
        post: operations["restoreContent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/purge-impact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 预览彻底删除影响
         * @description 仅回收站 article/project；token 绑定 generation、评论线程版本、引用清单与 5 分钟有效期。
         */
        get: operations["getPurgeImpact"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/contents/{id}/purge": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 彻底删除回收站内容
         * @description 重新验证影响 token；事务清理内容和评论、创建最小 tombstone 和远端删除任务。不清除 Git 历史或已有备份。
         */
        post: operations["purgeContent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 预览完整修改稿的 Markdown
         * @description 只读操作，不创建版本、不发布。后端统一渲染/清洗；限长和限频。
         */
        post: operations["previewMarkdown"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/taxonomy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询分类标签目录
         * @description 查询分类标签目录
         */
        get: operations["listAdminTaxonomy"];
        put?: never;
        /**
         * 创建分类或标签
         * @description 分类必须区分 tech/life，标签 channel=all。空目录项不单独同步，随内容引用进入仓库。
         */
        post: operations["createTaxonomy"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/taxonomy/{id}/impact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 预览改名或删除分类标签的影响
         * @description 只读；返回绑定精确变更与所有受影响内容 generation 的 5 分钟 token。
         */
        post: operations["previewTaxonomyChange"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/taxonomy/{id}/apply": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 确认改名、迁移或移除分类标签
         * @description 验证 token 后原子派生受影响当前公开/修改稿版本；公开版只复制原公开内容，绝不发布其修改稿。retire 可迁移到同类型标签，否则移除关联，保留历史快照。
         */
        post: operations["applyTaxonomyChange"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询评论和留言
         * @description 仅管理员响应含私密邮箱；state 指评论自身状态，effective_visible 还考虑根留言和文章状态。
         */
        get: operations["listAdminComments"];
        put?: never;
        /**
         * 以站主身份留言或回复
         * @description author_kind=owner 由会话确定；nickname 使用公开个人名称，缺省为站主；只向当前可公开目标提交。
         */
        post: operations["createOwnerComment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/comments/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取评论及管理信息
         * @description 读取评论及管理信息
         */
        get: operations["getAdminComment"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/comments/{id}/visibility": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 隐藏或恢复评论
         * @description CAS 校验线程 generation；根留言隐藏影响整组，恢复不改回复自身隐藏状态。
         */
        post: operations["setCommentVisibility"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/comments/{id}/delete-impact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取评论删除影响
         * @description 读取评论删除影响
         */
        get: operations["getCommentDeleteImpact"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/comments/{id}/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 删除评论或整组
         * @description 根留言删除对应线程与全部回复；删除单条回复保留其他回复，其目标 id 变 null、目标昵称快照保留。检查线程版本防止遗漏新回复。
         */
        post: operations["deleteComment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/media": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询图片及引用
         * @description 查询图片及引用
         */
        get: operations["listAssets"];
        put?: never;
        /**
         * 上传原始图片
         * @description JPEG/PNG/WebP，最多 10 MiB，解码像素最多 4000 万；拒绝动画及任意 SVG/HTML。按摘要去重，原图写入成功后入库；变体异步生成。
         */
        post: operations["uploadAsset"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/media/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取图片引用信息
         * @description 读取图片引用信息
         */
        get: operations["getAsset"];
        put?: never;
        post?: never;
        /**
         * 删除无引用图片
         * @description 同事务检查所有保留版本、封面、同步快照与待处理合并引用；有任一引用返回 409 ASSET_REFERENCED。物理删除失败可重试且不暴露文件。
         */
        delete: operations["deleteUnusedAsset"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/media/{sha256}/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取私有原图
         * @description 读取私有原图
         */
        get: operations["previewPrivateAsset"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取同步概况
         * @description 读取同步概况
         */
        get: operations["getSyncOverview"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync/reconcile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 主动请求仓库对账
         * @description 主动请求仓库对账
         */
        post: operations["enqueueReconcile"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync/jobs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询持久任务
         * @description 查询持久任务
         */
        get: operations["listJobs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync/jobs/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取任务状态
         * @description 读取任务状态
         */
        get: operations["getJob"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync/jobs/{id}/retry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 重试失败任务
         * @description 只允许 failed；重新比较当前 generation 和仓库 HEAD，不重放旧快照。冲突须走冲突解决，过期任务标记 superseded。
         */
        post: operations["retryJob"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync/conflicts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 查询同步冲突
         * @description 查询同步冲突
         */
        get: operations["listConflicts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync/conflicts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取基础、网站和仓库版本
         * @description 读取基础、网站和仓库版本
         */
        get: operations["getConflict"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/sync/conflicts/{id}/resolve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 提交冲突解决意图
         * @description 先登记意图；worker fetch 并检查远端 digest/本地 generation 后才在网站应用。离线不应用；状态已变则任务失败并刷新冲突。应用后普通 push，远端再变仍产生新冲突。
         */
        post: operations["resolveConflict"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/settings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取站点配置
         * @description 读取站点配置
         */
        get: operations["getSiteSettings"];
        /**
         * 更新站点名称介绍时区
         * @description 管理设置不进入内容仓库；时区必须是合法 IANA 名称。
         */
        put: operations["updateSiteSettings"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/repository": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 读取仓库连接配置
         * @description 读取仓库连接配置
         */
        get: operations["getRepository"];
        /**
         * 配置仓库连接
         * @description 凭据值不进入 API；credential_ref 只能引用服务器预装别名。只允许安全的 SSH/HTTPS remote 与相对 content_dir；禁止凭据嵌入 URL、本地文件及命令扩展。
         */
        put: operations["updateRepository"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/admin/repository/check": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 检查仓库访问能力
         * @description 只检查连接和指定分支，不导入或写入内容；通过任务返回脱敏结果。
         */
        post: operations["checkRepository"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @enum {string} */
        ContentKind: "article" | "project" | "profile" | "skill";
        Error: {
            code: string;
            message: string;
            field_errors: {
                path: string;
                message: string;
            }[];
            request_id: string;
            current_generation?: number;
            /** Format: uuid */
            conflict_id?: string;
        };
        ExpectedGeneration: {
            expected_generation: number;
        };
        /** @description 允许 https/http；个人公开联系链接另允许 mailto。后端校验协议。 */
        Link: {
            label: string;
            /** Format: uri */
            url: string;
        };
        TaxonomySnapshot: {
            /** Format: uuid */
            id: string;
            /** @enum {string} */
            kind: "category" | "tag";
            /** @enum {string} */
            channel: "tech" | "life" | "all";
            name: string;
            slug: string;
        };
        AssetRef: {
            sha256: string;
            alt: string;
        };
        TocItem: {
            id: string;
            text: string;
            /** @enum {integer} */
            level: 2 | 3;
        };
        ArticleDetails: {
            channel: ("tech" | "life") | null;
        };
        ProjectDetails: {
            role: string;
            started_on: string | null;
            ended_on: string | null;
            featured: boolean;
            tech_stack: string[];
        };
        ProfileDetails: {
            location: string;
            occupation: string;
        };
        SkillDetails: {
            group_name: string;
        };
        /** @description 完整替换修改稿；允许标题/摘要/正文为空。发布有额外完整性校验。未知字段拒绝，kind 不可改变。 */
        ArticleDraft: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: "article";
            title: string;
            summary: string;
            markdown: string;
            slug: string | null;
            display_order: number;
            cover: components["schemas"]["AssetRef"] | null;
            links: components["schemas"]["Link"][];
            related_content_ids: string[];
            body_asset_sha256s: string[];
            details: components["schemas"]["ArticleDetails"];
            category_id: string | null;
            tag_ids: string[];
        };
        /** @description 完整替换修改稿；允许标题/摘要/正文为空。发布有额外完整性校验。未知字段拒绝，kind 不可改变。 */
        ProjectDraft: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: "project";
            title: string;
            summary: string;
            markdown: string;
            slug: string | null;
            display_order: number;
            cover: components["schemas"]["AssetRef"] | null;
            links: components["schemas"]["Link"][];
            related_content_ids: string[];
            body_asset_sha256s: string[];
            details: components["schemas"]["ProjectDetails"];
        };
        /** @description 完整替换修改稿；允许标题/摘要/正文为空。发布有额外完整性校验。未知字段拒绝，kind 不可改变。 */
        ProfileDraft: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: "profile";
            title: string;
            summary: string;
            markdown: string;
            slug: null;
            display_order: number;
            cover: components["schemas"]["AssetRef"] | null;
            links: components["schemas"]["Link"][];
            related_content_ids: string[];
            body_asset_sha256s: string[];
            details: components["schemas"]["ProfileDetails"];
        };
        /** @description 完整替换修改稿；允许标题/摘要/正文为空。发布有额外完整性校验。未知字段拒绝，kind 不可改变。 */
        SkillDraft: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            kind: "skill";
            title: string;
            summary: string;
            markdown: string;
            slug: null;
            display_order: number;
            cover: components["schemas"]["AssetRef"] | null;
            links: components["schemas"]["Link"][];
            related_content_ids: string[];
            body_asset_sha256s: string[];
            details: components["schemas"]["SkillDetails"];
        };
        ContentDraft: components["schemas"]["ArticleDraft"] | components["schemas"]["ProjectDraft"] | components["schemas"]["ProfileDraft"] | components["schemas"]["SkillDraft"];
        Revision: {
            /** Format: uuid */
            id: string;
            revision_no: number;
            fields: components["schemas"]["ContentDraft"];
            taxonomy_snapshots: components["schemas"]["TaxonomySnapshot"][];
            /** Format: date-time */
            created_at: string;
        };
        SyncStatus: {
            /** @enum {string} */
            state: "pending" | "syncing" | "synced" | "failed" | "conflict";
            last_success_at: string | null;
            job_id: string | null;
            conflict_id: string | null;
            error_code: string | null;
            error_message: string | null;
        };
        AdminContent: {
            /** Format: uuid */
            id: string;
            kind: components["schemas"]["ContentKind"];
            /** @enum {string} */
            lifecycle: "active" | "trash";
            /** @enum {string} */
            visibility: "unpublished" | "published";
            generation: number;
            published: components["schemas"]["Revision"] | null;
            draft: components["schemas"]["Revision"] | null;
            first_published_at: string | null;
            published_updated_at: string | null;
            sync: components["schemas"]["SyncStatus"];
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        AdminContentSummary: {
            /** Format: uuid */
            id: string;
            kind: components["schemas"]["ContentKind"];
            title: string;
            generation: number;
            /** @enum {string} */
            lifecycle: "active" | "trash";
            /** @enum {string} */
            visibility: "unpublished" | "published";
            has_draft: boolean;
            sync: components["schemas"]["SyncStatus"];
            /** Format: date-time */
            updated_at: string;
        };
        CreateContent: {
            draft: components["schemas"]["ContentDraft"];
        };
        SaveDraft: {
            expected_generation: number;
            draft: components["schemas"]["ContentDraft"];
        };
        /** @description revision_id 必须属于该对象；首次发布可指定不晚于当前时间的历史时间，后续禁止更改。 */
        PublishContent: {
            expected_generation: number;
            /** Format: uuid */
            revision_id: string;
            /** Format: date-time */
            first_published_at?: string;
        };
        PublicAsset: {
            sha256: string;
            url: string;
            width: number;
            height: number;
            alt: string;
        };
        RelatedLink: {
            /** Format: uuid */
            id: string;
            kind: components["schemas"]["ContentKind"];
            title: string;
            url: string;
        };
        /** @description 只来自公开版本。profile/skill 无独立详情页，canonical_path 为 /about。 */
        PublicCard: {
            /** Format: uuid */
            id: string;
            kind: components["schemas"]["ContentKind"];
            title: string;
            summary: string;
            slug: string | null;
            canonical_path: string;
            cover: components["schemas"]["PublicAsset"] | null;
            /** Format: date-time */
            first_published_at: string;
            /** Format: date-time */
            updated_at: string;
            display_order: number;
            channel: ("tech" | "life") | null;
            category: components["schemas"]["TaxonomySnapshot"] | null;
            tags: components["schemas"]["TaxonomySnapshot"][];
        };
        /** @description 只读 DTO，不返回 markdown、generation、草稿、同步状态或私密字段；details 必须匹配 kind。 */
        PublicContent: {
            /** Format: uuid */
            id: string;
            kind: components["schemas"]["ContentKind"];
            title: string;
            summary: string;
            slug: string | null;
            canonical_path: string;
            cover: components["schemas"]["PublicAsset"] | null;
            /** Format: date-time */
            first_published_at: string;
            /** Format: date-time */
            updated_at: string;
            display_order: number;
            channel: ("tech" | "life") | null;
            category: components["schemas"]["TaxonomySnapshot"] | null;
            tags: components["schemas"]["TaxonomySnapshot"][];
            body_html: string;
            toc: components["schemas"]["TocItem"][];
            links: components["schemas"]["Link"][];
            related: components["schemas"]["RelatedLink"][];
            details: components["schemas"]["ArticleDetails"] | components["schemas"]["ProjectDetails"] | components["schemas"]["ProfileDetails"] | components["schemas"]["SkillDetails"];
        };
        PublicSite: {
            title: string;
            description: string;
            timezone: string;
        };
        PublicHome: {
            profile: components["schemas"]["PublicContent"] | null;
            tech_articles: components["schemas"]["PublicCard"][];
            life_articles: components["schemas"]["PublicCard"][];
            featured_projects: components["schemas"]["PublicCard"][];
        };
        SitemapItem: {
            path: string;
            /** Format: date-time */
            updated_at: string;
        };
        AdminIdentity: {
            /** Format: uuid */
            id: string;
            username: string;
        };
        Session: {
            user: components["schemas"]["AdminIdentity"];
            csrf_token: string;
            /** Format: date-time */
            expires_at: string;
        };
        Login: {
            username: string;
            password: string;
        };
        CommentTarget: {
            /** @constant */
            scope: "article";
            /** Format: uuid */
            content_id: string;
        } | {
            /** @constant */
            scope: "guestbook";
            content_id: null;
        };
        /** @description 邮箱可省略或为 null；不得提交 author_kind 或 owner 标识。 */
        CreateVisitorComment: {
            target: components["schemas"]["CommentTarget"];
            reply_to_id: string | null;
            nickname: string;
            body: string;
            email?: string | null;
        };
        CreateOwnerComment: {
            target: components["schemas"]["CommentTarget"];
            reply_to_id: string | null;
            body: string;
        };
        PublicComment: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            thread_id: string;
            is_root: boolean;
            reply_to_id: string | null;
            reply_to_nickname: string | null;
            nickname: string;
            body: string;
            /** @enum {string} */
            author_kind: "visitor" | "owner";
            /** Format: date-time */
            created_at: string;
        };
        PublicThread: {
            /** Format: uuid */
            id: string;
            root: components["schemas"]["PublicComment"];
            visible_reply_count: number;
        };
        AdminComment: {
            comment: components["schemas"]["PublicComment"];
            /** @enum {string} */
            state: "visible" | "hidden";
            effective_visible: boolean;
            email: string | null;
            target: components["schemas"]["CommentTarget"];
            thread_generation: number;
        };
        CommentVisibility: {
            /** @enum {string} */
            state: "visible" | "hidden";
            expected_thread_generation: number;
        };
        CommentDelete: {
            expected_thread_generation: number;
            /** @constant */
            confirm: true;
        };
        CommentImpact: {
            /** Format: uuid */
            comment_id: string;
            thread_generation: number;
            delete_count: number;
            includes_replies: boolean;
        };
        PurgeImpact: {
            /** Format: uuid */
            content_id: string;
            generation: number;
            revision_count: number;
            comment_count: number;
            asset_reference_count: number;
            impact_token: string;
            /** Format: date-time */
            expires_at: string;
        };
        PurgeContent: {
            expected_generation: number;
            impact_token: string;
            /** @constant */
            confirm: true;
        };
        PreviewRequest: {
            draft: components["schemas"]["ContentDraft"];
        };
        /** @description HTML 中私有图片使用管理预览地址，不能发布到公开前端。 */
        PreviewResult: {
            body_html: string;
            toc: components["schemas"]["TocItem"][];
            warnings: string[];
        };
        Asset: {
            sha256: string;
            /** @enum {string} */
            media_type: "image/jpeg" | "image/png" | "image/webp";
            byte_size: number;
            width: number;
            height: number;
            original_name: string;
            preview_url: string;
            revision_reference_count: number;
            sync_reference_count: number;
            /** Format: date-time */
            created_at: string;
        };
        Taxonomy: {
            /** Format: uuid */
            id: string;
            /** @enum {string} */
            kind: "category" | "tag";
            /** @enum {string} */
            channel: "tech" | "life" | "all";
            name: string;
            slug: string;
            display_order: number;
            generation: number;
            retired_at: string | null;
        };
        CreateTaxonomy: {
            /** @enum {string} */
            kind: "category" | "tag";
            /** @enum {string} */
            channel: "tech" | "life" | "all";
            name: string;
            slug: string;
            display_order: number;
        };
        TaxonomyChange: {
            /** @constant */
            operation: "rename";
            name: string;
            slug: string;
            display_order: number;
        } | {
            /** @constant */
            operation: "retire";
            replacement_id: string | null;
        };
        TaxonomyImpactRequest: {
            expected_generation: number;
            change: components["schemas"]["TaxonomyChange"];
        };
        TaxonomyImpact: {
            /** Format: uuid */
            taxonomy_id: string;
            affected_content_count: number;
            published_revision_count: number;
            draft_revision_count: number;
            impact_token: string;
            /** Format: date-time */
            expires_at: string;
        };
        ApplyTaxonomyChange: {
            expected_generation: number;
            change: components["schemas"]["TaxonomyChange"];
            impact_token: string;
        };
        TaxonomyApplyResult: {
            taxonomy: components["schemas"]["Taxonomy"];
            affected_content_count: number;
            sync_job_ids: string[];
        };
        Job: {
            /** Format: uuid */
            id: string;
            /** @enum {string} */
            kind: "sync_content" | "reconcile" | "resolve_conflict" | "delete_remote" | "image_variant" | "repository_check" | "delete_asset";
            aggregate_id: string | null;
            target_generation: number | null;
            /** @enum {string} */
            state: "queued" | "running" | "retry_wait" | "succeeded" | "failed" | "conflict" | "superseded";
            attempt_count: number;
            /** Format: date-time */
            next_run_at: string;
            error_code: string | null;
            error_message: string | null;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @description 仅代表排队；实际完成必须查询任务结果。 */
        AcceptedJob: {
            /** Format: uuid */
            job_id: string;
            /** @constant */
            state: "queued";
        };
        SnapshotRevision: {
            fields: components["schemas"]["ContentDraft"];
            taxonomy_snapshots: components["schemas"]["TaxonomySnapshot"][];
        };
        /** @description exists=false 表示仓库中对象不存在，其余状态与版本为 null。B/L/R 比较包含完整两份版本与分类快照。 */
        SyncSnapshot: {
            /** Format: uuid */
            content_id: string;
            kind: components["schemas"]["ContentKind"];
            exists: boolean;
            lifecycle: ("active" | "trash") | null;
            visibility: ("unpublished" | "published") | null;
            first_published_at: string | null;
            published: components["schemas"]["SnapshotRevision"] | null;
            draft: components["schemas"]["SnapshotRevision"] | null;
            digest: string;
        };
        ConflictSummary: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            content_id: string;
            /** @enum {string} */
            state: "open" | "resolving" | "resolved" | "superseded";
            local_generation: number;
            remote_commit: string;
            /** Format: date-time */
            created_at: string;
        };
        Conflict: {
            /** Format: uuid */
            id: string;
            /** Format: uuid */
            content_id: string;
            /** @enum {string} */
            state: "open" | "resolving" | "resolved" | "superseded";
            local_generation: number;
            remote_commit: string;
            /** Format: date-time */
            created_at: string;
            base: components["schemas"]["SyncSnapshot"] | null;
            local: components["schemas"]["SyncSnapshot"];
            remote: components["schemas"]["SyncSnapshot"];
        };
        /** @description manual 必须提供 merged_draft，其余 selection 禁止该字段。默认 UI 选择 save_draft，但协议必须显式提交 action。 */
        ResolveConflict: {
            expected_generation: number;
            expected_remote_digest: string;
            /** @enum {string} */
            selection: "local" | "remote" | "manual";
            /** @enum {string} */
            action: "save_draft" | "publish" | "withdraw" | "trash";
            merged_draft?: components["schemas"]["ContentDraft"];
        } & unknown;
        SyncOverview: {
            pending_count: number;
            failed_count: number;
            conflict_count: number;
            last_checked_at: string | null;
            last_success_at: string | null;
            repository_enabled: boolean;
        };
        SiteSettings: {
            title: string;
            description: string;
            timezone: string;
            generation: number;
            /** Format: date-time */
            updated_at: string;
        };
        UpdateSiteSettings: {
            expected_generation: number;
            title: string;
            description: string;
            timezone: string;
        };
        /** @description 不含凭据值、本地路径或原始 Git 日志。 */
        RepositoryConfig: {
            generation: number;
            remote_url: string;
            branch: string;
            content_dir: string;
            credential_ref: string;
            enabled: boolean;
            poll_interval_seconds: number;
            last_checked_at: string | null;
            last_success_at: string | null;
        };
        /** @description 首次配置 expected_generation=0；已有同步基线时禁止直接换仓库/分支/目录，返回 REPOSITORY_MIGRATION_REQUIRED。 */
        UpdateRepository: {
            expected_generation: number;
            remote_url: string;
            branch: string;
            content_dir: string;
            credential_ref: string;
            enabled: boolean;
            poll_interval_seconds: number;
        };
        Dashboard: {
            published_articles: number;
            published_projects: number;
            draft_contents: number;
            trash_contents: number;
            visible_comments: number;
            sync: components["schemas"]["SyncOverview"];
        };
        PublicCards: {
            items: components["schemas"]["PublicCard"][];
            page: number;
            page_size: number;
            total: number;
        };
        PublicContents: {
            items: components["schemas"]["PublicContent"][];
            page: number;
            page_size: number;
            total: number;
        };
        PublicThreads: {
            items: components["schemas"]["PublicThread"][];
            page: number;
            page_size: number;
            total: number;
        };
        PublicReplies: {
            items: components["schemas"]["PublicComment"][];
            page: number;
            page_size: number;
            total: number;
        };
        AdminContents: {
            items: components["schemas"]["AdminContentSummary"][];
            page: number;
            page_size: number;
            total: number;
        };
        AdminComments: {
            items: components["schemas"]["AdminComment"][];
            page: number;
            page_size: number;
            total: number;
        };
        Assets: {
            items: components["schemas"]["Asset"][];
            page: number;
            page_size: number;
            total: number;
        };
        Taxonomies: {
            items: components["schemas"]["Taxonomy"][];
            page: number;
            page_size: number;
            total: number;
        };
        Jobs: {
            items: components["schemas"]["Job"][];
            page: number;
            page_size: number;
            total: number;
        };
        Conflicts: {
            items: components["schemas"]["ConflictSummary"][];
            page: number;
            page_size: number;
            total: number;
        };
        SitemapEntries: {
            items: components["schemas"]["SitemapItem"][];
            page: number;
            page_size: number;
            total: number;
        };
        PublicTaxonomy: {
            /** Format: uuid */
            id: string;
            /** @enum {string} */
            kind: "category" | "tag";
            /** @enum {string} */
            channel: "tech" | "life" | "all";
            name: string;
            slug: string;
            article_count: number;
        };
        PublicTaxonomies: {
            items: components["schemas"]["PublicTaxonomy"][];
            page: number;
            page_size: number;
            total: number;
        };
    };
    responses: {
        /** @description 无效 JSON、参数或请求格式 */
        Error400: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 未登录或会话失效 */
        Error401: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 无权限、来源或 CSRF 校验失败 */
        Error403: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 对象不存在或当前不可公开 */
        Error404: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 版本、幂等、状态或引用冲突 */
        Error409: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 请求或上传超出限制 */
        Error413: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 媒体或内容类型不支持 */
        Error415: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 字段或业务规则校验失败 */
        Error422: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 超过限频，按 Retry-After 重试 */
        Error429: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                /** @description 建议等待秒数 */
                "Retry-After"?: number;
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description 服务暂不可用，不能按空列表处理 */
        Error503: {
            headers: {
                /** @description 本次请求标识。 */
                "X-Request-ID"?: string;
                "Cache-Control"?: "no-store";
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
    };
    parameters: {
        Page: number;
        PageSize: number;
        /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
        IdempotencyKey: string;
        /** @description 由会话接口取得；所有已认证写操作必须提供。 */
        CSRF: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getPublicSite: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicSite"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getPublicHome: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicHome"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    listPublicArticles: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                /** @description trim + Unicode case fold 后按标题摘要字面包含匹配；空 q 按普通列表 */
                q?: string;
                channel?: "tech" | "life";
                category_id?: string;
                tag_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicCards"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getPublicArticle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicContent"];
                };
            };
            /** @description 仍公开的旧链接跳转到当前路径 */
            308: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    Location: string;
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    listPublicProjects: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                featured?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicCards"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getPublicProject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicContent"];
                };
            };
            /** @description 仍公开的旧链接跳转到当前路径 */
            308: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    Location: string;
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getPublicProfile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicContent"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    listPublicSkills: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                group?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicContents"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    listPublicTaxonomy: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                kind?: "category" | "tag";
                channel?: "tech" | "life";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicTaxonomies"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    listSitemapEntries: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SitemapEntries"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    listPublicThreads: {
        parameters: {
            query: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                scope: "article" | "guestbook";
                content_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicThreads"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    createVisitorComment: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "target": {
                 *         "scope": "guestbook",
                 *         "content_id": null
                 *       },
                 *       "reply_to_id": null,
                 *       "nickname": "访客",
                 *       "body": "你好"
                 *     }
                 */
                "application/json": components["schemas"]["CreateVisitorComment"];
            };
        };
        responses: {
            /** @description 成功 */
            201: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicComment"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    listPublicReplies: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PublicReplies"];
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getPublicMedia: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sha256: string;
                variant: "original" | "thumb" | "reading";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "image/jpeg": string;
                    "image/png": string;
                    "image/webp": string;
                };
            };
            400: components["responses"]["Error400"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getSession: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Session"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Login"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description __Host-site_session=<opaque>; HttpOnly; Secure; SameSite=Lax; Path=/ */
                    "Set-Cookie"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Session"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    logout: {
        parameters: {
            query?: never;
            header: {
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            204: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getDashboard: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Dashboard"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    listAdminContents: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                kind?: components["schemas"]["ContentKind"];
                lifecycle?: "active" | "trash";
                visibility?: "published" | "unpublished";
                q?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContents"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    createContent: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "draft": {
                 *         "kind": "article",
                 *         "title": "我的第一篇文章",
                 *         "summary": "开始记录技术与生活。",
                 *         "markdown": "## 起点\n这是一篇示例。",
                 *         "slug": "first-post",
                 *         "display_order": 0,
                 *         "cover": null,
                 *         "links": [],
                 *         "related_content_ids": [],
                 *         "body_asset_sha256s": [],
                 *         "details": {
                 *           "channel": "tech"
                 *         },
                 *         "category_id": null,
                 *         "tag_ids": []
                 *       }
                 *     }
                 */
                "application/json": components["schemas"]["CreateContent"];
            };
        };
        responses: {
            /** @description 成功 */
            201: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    getAdminContent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    saveDraft: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "expected_generation": 2,
                 *       "draft": {
                 *         "kind": "article",
                 *         "title": "",
                 *         "summary": "",
                 *         "markdown": "",
                 *         "slug": null,
                 *         "display_order": 0,
                 *         "cover": null,
                 *         "links": [],
                 *         "related_content_ids": [],
                 *         "body_asset_sha256s": [],
                 *         "details": {
                 *           "channel": null
                 *         },
                 *         "category_id": null,
                 *         "tag_ids": []
                 *       }
                 *     }
                 */
                "application/json": components["schemas"]["SaveDraft"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    discardDraft: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ExpectedGeneration"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    publishContent: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PublishContent"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    withdrawContent: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ExpectedGeneration"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    trashContent: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ExpectedGeneration"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    restoreContent: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ExpectedGeneration"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminContent"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    getPurgeImpact: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PurgeImpact"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    purgeContent: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PurgeContent"];
            };
        };
        responses: {
            /** @description 成功 */
            204: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    previewMarkdown: {
        parameters: {
            query?: never;
            header: {
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PreviewRequest"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PreviewResult"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    listAdminTaxonomy: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                kind?: "category" | "tag";
                include_retired?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Taxonomies"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    createTaxonomy: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTaxonomy"];
            };
        };
        responses: {
            /** @description 成功 */
            201: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Taxonomy"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    previewTaxonomyChange: {
        parameters: {
            query?: never;
            header: {
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TaxonomyImpactRequest"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxonomyImpact"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    applyTaxonomyChange: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ApplyTaxonomyChange"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaxonomyApplyResult"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    listAdminComments: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                scope?: "article" | "guestbook";
                content_id?: string;
                state?: "visible" | "hidden";
                thread_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminComments"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    createOwnerComment: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateOwnerComment"];
            };
        };
        responses: {
            /** @description 成功 */
            201: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminComment"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    getAdminComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminComment"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    setCommentVisibility: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CommentVisibility"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminComment"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    getCommentDeleteImpact: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommentImpact"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    deleteComment: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CommentDelete"];
            };
        };
        responses: {
            /** @description 成功 */
            204: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    listAssets: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Assets"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    uploadAsset: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": {
                    /** Format: binary */
                    file: string;
                };
            };
        };
        responses: {
            /** @description 成功 */
            201: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Asset"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    getAsset: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Asset"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    deleteUnusedAsset: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            204: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    previewPrivateAsset: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "image/jpeg": string;
                    "image/png": string;
                    "image/webp": string;
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getSyncOverview: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SyncOverview"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    enqueueReconcile: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 已排队，查询任务获得最终结果 */
            202: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AcceptedJob"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    listJobs: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                state?: "queued" | "running" | "retry_wait" | "succeeded" | "failed" | "conflict" | "superseded";
                content_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Jobs"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Job"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    retryJob: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 已排队，查询任务获得最终结果 */
            202: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AcceptedJob"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    listConflicts: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                page_size?: components["parameters"]["PageSize"];
                state?: "open" | "resolving" | "resolved" | "superseded";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Conflicts"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    getConflict: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Conflict"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    resolveConflict: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ResolveConflict"];
            };
        };
        responses: {
            /** @description 已排队，查询任务获得最终结果 */
            202: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AcceptedJob"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    getSiteSettings: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SiteSettings"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    updateSiteSettings: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateSiteSettings"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SiteSettings"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    getRepository: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RepositoryConfig"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            503: components["responses"]["Error503"];
        };
    };
    updateRepository: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateRepository"];
            };
        };
        responses: {
            /** @description 成功 */
            200: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RepositoryConfig"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
    checkRepository: {
        parameters: {
            query?: never;
            header: {
                /** @description 一次业务提交生成一个 UUID；重试复用。有效期 24 小时，同键不同载荷返回 409。 */
                "Idempotency-Key": components["parameters"]["IdempotencyKey"];
                /** @description 由会话接口取得；所有已认证写操作必须提供。 */
                "X-CSRF-Token": components["parameters"]["CSRF"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 已排队，查询任务获得最终结果 */
            202: {
                headers: {
                    /** @description 本次请求标识。 */
                    "X-Request-ID"?: string;
                    "Cache-Control"?: "no-store";
                    /** @description 仅幂等响应重放时返回；前端重新查询当前资源状态。 */
                    "Idempotency-Replayed"?: "true";
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AcceptedJob"];
                };
            };
            400: components["responses"]["Error400"];
            401: components["responses"]["Error401"];
            403: components["responses"]["Error403"];
            404: components["responses"]["Error404"];
            409: components["responses"]["Error409"];
            413: components["responses"]["Error413"];
            415: components["responses"]["Error415"];
            422: components["responses"]["Error422"];
            429: components["responses"]["Error429"];
            503: components["responses"]["Error503"];
        };
    };
}
