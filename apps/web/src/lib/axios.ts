import axios from 'axios'
import { env } from './env'
import { useAuthStore } from '@/store/auth-store'

export const api = axios.create({
  baseURL: env.API_GATEWAY_URL,
  withCredentials: true,
})

export async function tryBootRefresh() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  if (user) {
    try {
      await api.post('/auth/refresh', {})
      return true
    } catch (error) {
      logout()
      return false
    }
  }
  return false
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (!error.config._retry) {
        error.config._retry = true

        try {
          await api.post('/auth/refresh', {})
          return api(error.config)
        } catch (refreshError) {
          const { useAuthStore } = await import('@/store/auth-store')
          useAuthStore.getState().logout()
        }
      }
    }
    return Promise.reject(error)
  }
)
