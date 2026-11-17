import { createRouter, createWebHistory } from 'vue-router'
import { useSession } from '../composables/useSession'
import LoginView from '../views/login/LoginView.vue'
import OverviewView from '../views/overview/OverviewView.vue'
import SessionView from '../views/session/SessionView.vue'
import ConnectionView from '../views/connection/ConnectionView.vue'

/** safeReturnPath 只允许回到现有管理页面，阻止登录后跳往外部 URL。 */
export function safeReturnPath(value: unknown) {
  return typeof value === 'string' && ['/', '/session'].includes(value) ? value : '/'
}

export const router = createRouter({
  history: createWebHistory('/admin/'),
  routes: [
    { path: '/login', name: 'login', component: LoginView, meta: { title: '站主登录' } },
    {
      path: '/connection',
      name: 'connection',
      component: ConnectionView,
      meta: { title: '连接状态' },
    },
    {
      path: '/',
      name: 'overview',
      component: OverviewView,
      meta: { requiresAuth: true, title: '管理概览' },
    },
    {
      path: '/session',
      name: 'session',
      component: SessionView,
      meta: { requiresAuth: true, title: '登录状态' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach(async (to) => {
  const state = useSession()
  if (state.status.value === 'unknown' || state.status.value === 'checking') await state.refresh()
  // 路由守卫只负责交互，管理接口本身仍由 Go 每次鉴权。
  if (to.meta.requiresAuth && state.status.value === 'anonymous') {
    return { name: 'login', query: { returnTo: to.path } }
  }
  if (to.meta.requiresAuth && state.status.value === 'unavailable') {
    return { name: 'connection', query: { returnTo: to.path } }
  }
  if (to.name === 'login' && state.authenticated.value) return safeReturnPath(to.query.returnTo)
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title || '站主管理')} · 个人空间`
})
