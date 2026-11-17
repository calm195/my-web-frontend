<script setup lang="ts">
import type { PublicSite } from '@personal/api-client'

defineProps<{ site?: PublicSite | null }>()
</script>

<template>
  <section class="home-hero" aria-labelledby="home-heading">
    <div>
      <p class="eyebrow">一个慢慢生长的个人空间</p>
      <h1 id="home-heading">认真做事，<br />也认真生活。</h1>
      <p class="hero-description">
        {{ site?.description || '在这里记录技术探索，也保存日常生活中的小小发现。' }}
      </p>
      <div class="hero-actions">
        <NuxtLink to="/blog" class="button">技术与思考 <span aria-hidden="true">↗</span></NuxtLink>
        <NuxtLink to="/life" class="button secondary">走进日常</NuxtLink>
      </div>
    </div>
    <div class="quiet-landscape" aria-hidden="true">
      <div class="landscape-sun" />
      <div class="landscape-hill far" />
      <div class="landscape-hill near" />
      <span class="landscape-caption">把普通日子，慢慢写下来。</span>
    </div>
  </section>

  <section class="welcome-section" aria-labelledby="welcome-heading">
    <div>
      <p class="eyebrow">写在开始</p>
      <h2 id="welcome-heading">从这里，慢慢积累。</h2>
    </div>
    <p>文章、项目和生活记录正在整理中。愿这个小空间，装得下持续的探索，也留得住平凡的日常。</p>
  </section>
</template>
