import { createRouter, createWebHistory } from 'vue-router'
import { getSessionId } from '../utils/auth.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/main',
    alias: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  const hasSessionId = getSessionId()
  if (hasSessionId) {
    if (to.name === 'login') {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
