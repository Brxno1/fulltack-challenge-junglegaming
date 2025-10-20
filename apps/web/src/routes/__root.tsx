import * as React from 'react'
import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth-store'
import { QueryClientProvider } from '@tanstack/react-query'
import { createQueryClient } from '../lib/query-client'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { tryBootRefresh } from '@/lib/axios'


export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const { user } = useAuthStore.getState()
    const isAuthPage = location.pathname === '/login'

    if (!user && !isAuthPage) {
      throw redirect({ to: '/login' })
    }

    if (user && isAuthPage) {
      throw redirect({ to: '/' })
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const [queryClient] = React.useState(() => createQueryClient())
  React.useEffect(() => {
    void tryBootRefresh()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </ThemeProvider>
      <Toaster
        position='top-right'
        closeButton
      />
    </QueryClientProvider>
  )
}
