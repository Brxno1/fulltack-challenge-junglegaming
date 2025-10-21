import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthTabs } from '@/components/login'
import { useAuthStore } from '@/store/auth-store'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (user) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthTabs />
}
