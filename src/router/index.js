import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresGuest: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Função para configurar as guards
export const setupRouterGuards = (router) => {
  router.beforeEach(async (to, from, next) => {
    const authStore = await import('@/stores/user')
    const userStore = authStore.useUserStore()
    
    if (to.meta.requiresAuth) {
      await userStore.initializeAuth()
      if (!userStore.isAuthenticated) {
        return next({
          name: 'login',
          query: { redirect: to.fullPath }
        })
      }
    }
    
    if (to.meta.requiresGuest && userStore.isAuthenticated) {
      return next({ name: 'home' })
    }
    
    next()
  })
}

export default router