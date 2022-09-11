<template>
  <div>main</div>
  <button @click="handleLogout">logout</button> |
  <button @click="testCookieHeader">test cookie</button>
</template>

<script setup>
import { removeToken } from '../utils/auth.js'
import { useRouter } from 'vue-router'
import { request } from '../utils/request.js'

const router = useRouter()

function handleLogout() {
  removeToken()
  router.replace({ name: 'login' })
}

async function testCookieHeader() {
  await request({
    url: '/test-cookie-header',
    method: 'get',
  })
}
</script>
