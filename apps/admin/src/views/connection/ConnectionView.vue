<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSession } from '../../composables/useSession'
import { errorMessage } from '../../composables/errors'
import { safeReturnPath } from '../../router'

const state = useSession()
const route = useRoute()
const router = useRouter()
const pending = ref(false)
const message = computed(() => errorMessage(state.lastError.value))

async function retry() {
  pending.value = true
  await state.refresh()
  pending.value = false
  if (state.authenticated.value) await router.replace(safeReturnPath(route.query.returnTo))
  else if (state.status.value === 'anonymous')
    await router.replace({
      name: 'login',
      query: { returnTo: safeReturnPath(route.query.returnTo) },
    })
}
</script>

<template>
  <section class="management-page narrow-page" aria-labelledby="connection-heading">
    <p class="eyebrow">稍等一下</p>
    <h1 id="connection-heading">暂时无法确认登录状态</h1>
    <p class="notice error" role="alert">{{ message }}</p>
    <p class="muted">我们会保留当前页面，连接恢复后可以再试。</p>
    <button class="button" :disabled="pending" @click="retry">
      {{ pending ? '正在连接…' : '重新连接' }}
    </button>
  </section>
</template>
