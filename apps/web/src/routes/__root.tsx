import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">
            Jungle Gaming
          </h1>
          <p className="text-center mt-2">
            Sistema de Gestão de Tarefas Colaborativo
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
