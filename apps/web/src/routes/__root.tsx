import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-center text-4xl font-bold">Jungle Gaming</h1>
          <p className="mt-2 text-center">
            Sistema de Gestão de Tarefas Colaborativo
          </p>
        </header>

        <main className="mx-auto max-w-4xl">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
