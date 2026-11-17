<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSession } from '../../composables/useSession'

const state = useSession()
</script>

<template>
  <section class="management-page" aria-labelledby="overview-heading">
    <p class="eyebrow">自己的空间，慢慢整理</p>
    <h1 id="overview-heading">你好，{{ state.session.value?.user.username }}。</h1>
    <p class="page-description">欢迎回到网站管理。</p>
    <div class="management-panel">
      <span class="status-badge">已登录</span>
      <h2>登录状态正常</h2>
      <p class="muted">内容编辑与发布功能正在准备中。你现在可以查看登录状态，或回到公开网站。</p>
      <div class="panel-actions">
        <RouterLink to="/session" class="button">查看登录状态</RouterLink>
        <a href="/" class="button secondary">回到网站</a>
      </div>
    </div>
  </section>
</template>
