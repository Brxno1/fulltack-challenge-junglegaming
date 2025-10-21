import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
 id: string
 username: string
 email: string
}

interface AuthState {
 user: User | null
}

interface AuthActions {
 setAuth: (user: User) => void
 logout: () => void
 clearCache: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
 persist(
  (set) => ({
   user: null,

   setAuth: (user) => {
    try {
     localStorage.removeItem('auth-storage')
    } catch { }

    const safeUser = {
     id: user.id,
     username: user.username,
     email: user.email,
    }
    set({
     user: safeUser,
    })
   },

   logout: () => {
    set({
     user: null,
    })
    try {
     localStorage.removeItem('auth-storage')
    } catch { }
   },

   clearCache: () => {
    try {
     localStorage.removeItem('auth-storage')
     set({
      user: null,
     })
    } catch { }
   },
  }),
  {
   name: 'auth-storage',
   partialize: (state) => ({
    user: state.user,
   }),
  }
 )
)
