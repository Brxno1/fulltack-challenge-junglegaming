import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { createQueryClient } from '../lib/query-client'
import { ThemeProvider } from '@/components/theme/theme-provider'


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [queryClient] = React.useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
