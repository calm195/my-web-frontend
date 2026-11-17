<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ApiError } from '@personal/api-client'
import { useSession, announceSessionChange } from '../../composables/useSession'
import { errorMessage } from '../../composables/errors'
import { safeReturnPath } from '../../router'

const route = useRoute()
const router = useRouter()
const state = useSession()
const username = ref('')
const password = ref('')
const pending = ref(false)
const failure = shallowRef<unknown>(null)
const showPassword = ref(false)
const message = computed(() => (failure.value ? errorMessage(failure.value) : ''))
const fieldError = (field: string) =>
  failure.value instanceof ApiError
    ? failure.value.fieldErrors.find((item) => item.path === `/${field}`)?.message
    : undefined

async function submit() {
  if (pending.value) return
  pending.value = true
  failure.value = null
  try {
    await state.login({ username: username.value, password: password.value })
    password.value = ''
    announceSessionChange()
    await router.replace(safeReturnPath(route.query.returnTo))
  } catch (error) {
    // 请求失败保留表单内存输入，不自动重新登录，也不写入 localStorage。
    failure.value = error
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="login-layout">
    <section class="login-intro">
      <p class="eyebrow">回到自己的小空间</p>
      <h1>欢迎回来。</h1>
      <p>记录值得留下的事，<br />让日常慢慢成为自己的故事。</p>
      <div class="intro-decoration" aria-hidden="true"><span /></div>
    </section>
    <section class="login-panel" aria-labelledby="login-heading">
      <h2 id="login-heading">站主登录</h2>
      <p class="muted panel-intro">使用你的站主账号继续。</p>
      <p v-if="route.query.expired" class="notice" role="status">登录状态已失效，请重新登录。</p>
      <form :aria-busy="pending" @submit.prevent="submit">
        <div class="form-field">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="username"
            name="username"
            type="text"
            autocomplete="username"
            maxlength="80"
            required
            :aria-invalid="Boolean(fieldError('username'))"
            :aria-describedby="fieldError('username') ? 'username-error' : undefined"
          />
          <p v-if="fieldError('username')" id="username-error" class="field-error">
            {{ fieldError('username') }}
          </p>
        </div>
        <div class="form-field">
          <label for="password">密码</label>
          <div class="password-field">
            <input
              id="password"
              v-model="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              maxlength="256"
              required
              :aria-invalid="Boolean(fieldError('password'))"
              :aria-describedby="fieldError('password') ? 'password-error' : undefined"
            />
            <button
              class="password-toggle"
              type="button"
              :aria-label="showPassword ? '隐藏密码' : '显示密码'"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '隐藏' : '显示' }}
            </button>
          </div>
          <p v-if="fieldError('password')" id="password-error" class="field-error">
            {{ fieldError('password') }}
          </p>
        </div>
        <p v-if="message" class="notice error" role="alert">{{ message }}</p>
        <button class="button login-submit" :disabled="pending" type="submit">
          {{ pending ? '正在登录…' : '登录' }} <span v-if="!pending" aria-hidden="true">→</span>
        </button>
      </form>
      <p class="login-note">此入口仅供站主管理；阅读网站无需登录。</p>
    </section>
  </div>
</template>
