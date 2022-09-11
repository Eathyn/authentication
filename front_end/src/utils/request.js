import axios from 'axios'
import { getToken, TokenKey } from './auth.js'

export const request = axios.create({
  baseURL: 'http://localhost:8000',
})

request.interceptors.request.use((config) => {
  if (getToken()) {
    config.headers[TokenKey] = getToken()
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})
