import { api } from '@/lib/axios'
import { useAuthStore } from '@/store/auth-store'

export type LoginPayload = { email: string; password: string }

export async function login(payload: LoginPayload) {
 const { data } = await api.post('/auth/login', payload)

 if (data?.accessToken) {
  api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
 }

 useAuthStore.getState().setAuth(data.user)

 return data.user
}


