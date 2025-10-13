import { createFileRoute } from '@tanstack/react-router'
import { AuthTabs } from '@/components/login'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthTabs />
    </div>
  )
}
