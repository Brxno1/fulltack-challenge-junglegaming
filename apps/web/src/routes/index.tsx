import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useTasksList } from '@/hooks/useTasksList';
import { useAuthStore } from '@/store/auth-store';
import { TasksHeader } from '@/components/tasks/tasks-header';
import { TasksTable } from '@/components/tasks/tasks-table';
import { tasksColumns } from '@/components/tasks/columns/tasks-columns';
import { TaskInfo } from '@/components/tasks/tasks-info';
import { useState } from 'react';
import { toast } from 'sonner';
import { Task } from '@jungle/types';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
  component: () => {
    const { data, isLoading } = useTasksList()

    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isInfoOpen, setIsInfoOpen] = useState(false)


    const handleNewTask = () => {
      toast('Nova tarefa - funcionalidade fictícia')
    }

    const handleTaskClick = (task: Task) => {
      setSelectedTask(task)
      setIsInfoOpen(true)
    }

    const handleCloseInfo = () => {
      setIsInfoOpen(false)
      setSelectedTask(null)
    }

    const counts = {
      todo: data?.tasks?.filter((task: Task) => task.status === 'TODO').length || 0,
      inProgress: data?.tasks?.filter((task: Task) => task.status === 'IN_PROGRESS').length || 0,
      completed: data?.tasks?.filter((task: Task) => task.status === 'DONE').length || 0,
    }

    return (
      <SidebarProvider>
        <AppSidebar />
        <div className={`grid flex-1 h-full transition-all duration-300 ${isInfoOpen
          ? 'grid-cols-[1fr_36rem]'
          : 'grid-cols-1'
          }`}>
          <main className="p-4 min-w-0">
            <div className="space-y-4">
              <TasksHeader
                onNewTask={handleNewTask}
                counts={counts}
              />
              <TasksTable
                data={data?.tasks ?? []}
                columns={tasksColumns}
                isLoading={isLoading}
                onTaskClick={handleTaskClick}
              />
            </div>
          </main>
          {isInfoOpen && (
            <div className="p-4">
              <TaskInfo
                task={selectedTask}
                isOpen={isInfoOpen}
                onClose={handleCloseInfo}
              />
            </div>
          )}
        </div>
      </SidebarProvider>
    )
  },
});

