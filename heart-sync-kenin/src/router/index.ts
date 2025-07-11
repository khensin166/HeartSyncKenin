// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../features/auth/presentation/views/LoginPage.vue'
import RegisterView from '../features/auth/presentation/views/RegisterPage.vue'
import DashboardView from '../features/auth/presentation/views/DashboardView.vue'
import GetStartedView from '../features/auth/presentation/views/GetStartedView.vue'
import { useAuthStore } from '../features/auth/presentation/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'getStarted',
      component: GetStartedView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

// Navigation Guard untuk melindungi rute yang memerlukan autentikasi
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
