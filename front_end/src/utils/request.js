import axios from 'axios'
import { getSessionId, key } from './auth.js'

export const request = axios.create({
  baseURL: 'http://localhost:8000',
})

request.interceptors.request.use((config) => {
  if (getSessionId()) {
    config.headers[key] = getSessionId()
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
