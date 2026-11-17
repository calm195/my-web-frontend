import type { components } from '../src/generated/schema'

type Schemas = components['schemas']

// 正例允许不完整修改稿，空标题和空频道由发布步骤另行校验。
export const incompleteArticle: Schemas['ContentDraft'] = {
  kind: 'article',
  title: '',
  summary: '',
  markdown: '',
  slug: null,
  display_order: 0,
  cover: null,
  links: [],
  related_content_ids: [],
  body_asset_sha256s: [],
  category_id: null,
  tag_ids: [],
  details: { channel: null },
}

export const guestbook: Schemas['CommentTarget'] = { scope: 'guestbook', content_id: null }

// @ts-expect-error oneOf 需要留言板 content_id 为 null。
export const invalidGuestbook: Schemas['CommentTarget'] = {
  scope: 'guestbook',
  content_id: 'content-id',
}

// @ts-expect-error discriminator 不能把文章 details 当作个人资料字段。
export const invalidProfile: Schemas['ContentDraft'] = { ...incompleteArticle, kind: 'profile' }

export const invalidOwner: Schemas['CreateVisitorComment'] = {
  target: guestbook,
  reply_to_id: null,
  nickname: '站主',
  body: '测试',
  // @ts-expect-error 前端不能通过公开评论请求伪造站主身份。
  author_kind: 'owner',
}

// 生成器不完整表达 JSON Schema if/then/else；此例能编译但后端必须拒绝，不能将类型通过当作业务合法。
export const knownConditionalLimit: Schemas['ResolveConflict'] = {
  expected_generation: 1,
  expected_remote_digest: 'a'.repeat(64),
  selection: 'manual',
  action: 'save_draft',
}
