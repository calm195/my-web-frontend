<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSession } from '../../composables/useSession'

const state = useSession()
const refreshing = ref(false)
const checked = ref(false)
const expires = computed(() => {
  const value = state.session.value?.expires_at
  return value
    ? new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(value),
      )
    : '—'
})

async function refreshSession() {
  refreshing.value = true
  checked.value = false
  await state.refresh()
  checked.value = state.authenticated.value
  refreshing.value = false
}
</script>

<template>
  <section class="management-page" aria-labelledby="session-heading">
    <p class="eyebrow">账号与访问</p>
    <h1 id="session-heading">登录状态</h1>
    <p class="page-description">管理你在这台浏览器中的登录。</p>
    <div class="management-panel">
      <dl class="session-details">
        <div>
          <dt>当前账号</dt>
          <dd>{{ state.session.value?.user.username }}</dd>
        </div>
        <div>
          <dt>登录状态</dt>
          <dd><span class="status-badge">已登录</span></dd>
        </div>
        <div>
          <dt>最晚有效至</dt>
          <dd>{{ expires }}</dd>
        </div>
      </dl>
      <p class="muted">长时间未操作、修改密码或主动退出后，需要重新登录。</p>
      <button class="button secondary" :disabled="refreshing" @click="refreshSession">
        {{ refreshing ? '正在检查…' : '检查登录状态' }}
      </button>
      <p v-if="checked" class="check-message" role="status">登录状态已确认。</p>
    </div>
  </section>
</template>
