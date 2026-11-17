<script setup lang="ts">
import { ref, watch } from 'vue'
import { useHead, useRoute } from '#imports'
import { usePublicSite } from './composables/usePublicSite'

const { data: site, status, error, refresh } = await usePublicSite()
const menuOpen = ref(false)
const route = useRoute()
const navigation = [
  { to: '/', title: '首页' },
  { to: '/about', title: '关于我' },
  { to: '/projects', title: '项目' },
  { to: '/blog', title: '技术博客' },
  { to: '/life', title: '生活分享' },
  { to: '/guestbook', title: '留言板' },
]

watch(
  () => route.path,
  () => {
    menuOpen.value = false
  },
)
useHead({
  title: () => site.value?.title || '个人空间',
  meta: [{ name: 'description', content: () => site.value?.description || '' }],
})
</script>

<template>
  <a class="skip-link" href="#main-content">跳到正文</a>
  <div class="site-shell">
    <header class="site-header">
      <NuxtLink to="/" class="site-brand" aria-label="返回首页">
        <span class="brand-mark" aria-hidden="true">隅</span>
        <span>{{ site?.title || '个人空间' }}<small>记录 · 思考 · 生活</small></span>
      </NuxtLink>
      <button
        class="menu-toggle button secondary"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-navigation"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? '收起导航' : '打开导航' }}
      </button>
      <nav
        id="site-navigation"
        :class="['site-navigation', { open: menuOpen }]"
        aria-label="主导航"
      >
        <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to">{{
          item.title
        }}</NuxtLink>
      </nav>
    </header>

    <main id="main-content" tabindex="-1">
      <div v-if="error" class="notice error service-notice" role="alert">
        <p>暂时无法读取站点信息，请稍后重试。</p>
        <button class="button secondary" :disabled="status === 'pending'" @click="refresh()">
          重新加载
        </button>
      </div>
      <p v-else-if="status === 'pending'" class="service-notice muted" role="status">
        正在读取站点信息…
      </p>
      <NuxtPage :site="site" />
    </main>

    <footer class="site-footer">
      <span>{{ site?.title || '个人空间' }} · 留一点生活的痕迹</span>
      <a href="/admin/">站主管理</a>
    </footer>
  </div>
</template>
