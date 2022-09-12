<template>
  <div>main</div>
  <button @click="handleLogout">logout</button> |
  <button @click="testCookieHeader">test cookie</button>
</template>

<script setup>
import { removeSessionId } from '../utils/auth.js'
import { useRouter } from 'vue-router'
import { request } from '../utils/request.js'

const router = useRouter()

function handleLogout() {
  removeSessionId()
  router.replace({ name: 'login' })
}

async function testCookieHeader() {
  await request({
    url: '/test-session-header',
    method: 'get',
  })
}
</script>
