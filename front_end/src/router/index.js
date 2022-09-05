import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/main',
    alias: '/',
    component: () => import('../views/Main.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
