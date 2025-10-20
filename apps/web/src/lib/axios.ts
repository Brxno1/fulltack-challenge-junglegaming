import axios from 'axios'
import { env } from './env'

export const api = axios.create({
  baseURL: env.API_GATEWAY_URL,
  withCredentials: true,
})

export async function tryBootRefresh() {
  try {
    const hasAuth = Boolean(api.defaults.headers.common?.Authorization)
    if (hasAuth) return

    const res = await api.post('/auth/refresh', {})
    const { accessToken } = res.data || {}
    if (accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
  } catch {
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config?._retry) {
      error.config._retry = true
      try {
        const refreshResponse = await api.post(`/auth/refresh`, {})

        const { accessToken } = refreshResponse.data

        if (accessToken) {
          error.config.headers.Authorization = `Bearer ${accessToken}`
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        }

        return api.request(error.config)
      } catch (refreshError) {
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
