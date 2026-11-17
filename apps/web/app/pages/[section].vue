<script setup lang="ts">
import type { PublicSite } from '@personal/api-client'
import { computed } from 'vue'
import { createError, useRoute } from '#imports'

defineProps<{ site?: PublicSite | null }>()
const route = useRoute()
const sections: Record<string, { title: string; eyebrow: string; description: string }> = {
  about: {
    title: '关于我',
    eyebrow: '认识一下',
    description: '个人经历与技术能力正在整理中。很高兴在这里与你相遇。',
  },
  projects: {
    title: '项目',
    eyebrow: '从想法到实践',
    description: '项目介绍正在整理中，之后会在这里记录做过的事情与一路的收获。',
  },
  blog: {
    title: '技术博客',
    eyebrow: '持续学习，认真记录',
    description: '技术文章正在整理中。这里会留下问题、思考，以及一步步找到答案的过程。',
  },
  life: {
    title: '生活分享',
    eyebrow: '日常也值得收藏',
    description: '生活记录正在整理中。走过的地方、读过的书，还有那些平凡而珍贵的小事。',
  },
  guestbook: {
    title: '留言板',
    eyebrow: '留下一次相遇',
    description: '留言区正在准备中，期待之后在这里听到你的声音。',
  },
}
const section = computed(() => sections[String(route.params.section)])
if (!section.value) {
  throw createError({ statusCode: 404, statusMessage: '页面不存在' })
}
</script>

<template>
  <section v-if="section" class="section-intro" aria-labelledby="section-heading">
    <p class="eyebrow">{{ section.eyebrow }}</p>
    <h1 id="section-heading">{{ section.title }}</h1>
    <div class="quiet-empty">
      <span class="empty-line" aria-hidden="true" />
      <p>{{ section.description }}</p>
      <NuxtLink to="/">回到首页 <span aria-hidden="true">↗</span></NuxtLink>
    </div>
  </section>
</template>
