import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
 id: string
 username: string
 email: string
}

interface AuthState {
 user: User | null
 isAuthenticated: boolean
}

interface AuthActions {
 setAuth: (user: User) => void
 logout: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
 persist(
  (set) => ({
   user: null,
   isAuthenticated: false,

   setAuth: (user) => {
    const safeUser = {
     id: user.id,
     username: user.username,
     email: user.email,
    }
    set({
     user: safeUser,
     isAuthenticated: true,
    })
   },

   logout: () => {
    set({
     user: null,
     isAuthenticated: false,
    })
    try {
     localStorage.removeItem('auth-storage')
     if (typeof window !== 'undefined') {
      window.location.href = '/login'
     }
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
