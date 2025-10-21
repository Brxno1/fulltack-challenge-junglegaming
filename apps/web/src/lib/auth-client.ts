import { api } from '@/lib/axios'
import { useAuthStore } from '@/store/auth-store'

export type LoginPayload = { email: string; password: string }

export async function login(payload: LoginPayload) {
 const { data } = await api.post('/auth/login', payload)

 useAuthStore.getState().setAuth(data.user)

 return data.user
}


