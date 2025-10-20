import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarProvider>
    )
  },
});
