import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Jika user membuka URL root (localhost:5173/)
      path: '/',
      name: 'home',
      // Langsung arahkan (lempar) ke halaman login
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guard — proteksi rute yang membutuhkan autentikasi
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const hasValidToken = !!token && token !== 'undefined' && token !== 'null'
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !hasValidToken) {
    // Belum login → lempar ke halaman login
    next({ name: 'login' })
  } else if (to.name === 'login' && hasValidToken) {
    // Sudah login & mencoba akses login page → redirect ke dashboard
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router