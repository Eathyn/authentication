<template>
  <div>login</div>
  <label>
    Name:
    <input type="text" v-model="account.name">
  </label>
  <label>
    Password:
    <input type="text" v-model="account.password">
  </label>
  <button @click="handleLogin">submit</button>
</template>

<script setup>
import { reactive } from 'vue'
import { setSessionId } from '../utils/auth.js'
import { useRouter } from 'vue-router'
import { request } from '../utils/request.js'
import { key } from '../utils/auth.js'

const router = useRouter()

const account = reactive({
  name: '',
  password: '',
})

async function handleLogin() {
  const res = await request({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(account),
  })
  const { data } = res
  setSessionId(data.sessionId)
  await router.push({ name: 'main' })
}
</script>
