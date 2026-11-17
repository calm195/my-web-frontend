<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { announceSessionChange, observeSession, useSession } from './composables/useSession'
import { errorMessage } from './composables/errors'
import { safeReturnPath } from './router'

const route = useRoute()
const router = useRouter()
const state = useSession()
const loggingOut = ref(false)
const logoutError = ref('')
let stopObservation: (() => void) | undefined

onMounted(() => {
  stopObservation = observeSession()
})
onUnmounted(() => {
  stopObservation?.()
})

watch(state.status, (status) => {
  if (status === 'anonymous' && route.meta.requiresAuth) {
    void router.replace({ name: 'login', query: { returnTo: route.path, expired: '1' } })
  } else if (status === 'unavailable' && route.meta.requiresAuth) {
    void router.replace({ name: 'connection', query: { returnTo: route.path } })
  } else if (status === 'authenticated' && ['login', 'connection'].includes(String(route.name))) {
    void router.replace(safeReturnPath(route.query.returnTo))
  }
})

async function logout() {
  loggingOut.value = true
  logoutError.value = ''
  try {
    await state.logout()
    announceSessionChange()
    await router.replace({ name: 'login' })
  } catch (error) {
    logoutError.value = errorMessage(error)
  } finally {
    loggingOut.value = false
  }
}
</script>

<template>
  <a href="#admin-main" class="skip-link">跳到正文</a>
  <div class="admin-shell">
    <header class="admin-header">
      <a class="admin-brand" href="/">
        <span class="brand-mark" aria-hidden="true">隅</span>
        <span>个人空间</span>
        <small>站主管理</small>
      </a>
      <div v-if="state.authenticated.value" class="session-actions">
        <span class="muted">{{ state.session.value?.user.username }}</span>
        <button class="button secondary" :disabled="loggingOut" @click="logout">
          {{ loggingOut ? '正在退出…' : '退出登录' }}
        </button>
      </div>
      <a v-else class="return-site" href="/">回到网站 <span aria-hidden="true">↗</span></a>
    </header>

    <nav v-if="state.authenticated.value" class="admin-navigation" aria-label="管理导航">
      <RouterLink to="/">管理概览</RouterLink>
      <RouterLink to="/session">登录状态</RouterLink>
    </nav>

    <main id="admin-main" tabindex="-1">
      <p v-if="logoutError" class="notice error" role="alert">{{ logoutError }}</p>
      <RouterView v-if="!route.meta.requiresAuth || state.authenticated.value" />
      <p v-else role="status" class="muted">正在确认登录状态…</p>
    </main>
    <footer class="admin-footer">留一点空间，整理思考与生活。</footer>
  </div>
</template>
