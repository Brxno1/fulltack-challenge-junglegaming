import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, User, MessageSquare, History, X } from 'lucide-react'
import { TaskComments } from './task-comments'
import { HistoryTask } from './history-task'
import { formatTaskDeadline } from '@/lib/date-utils'
import { TaskStatusBadge } from '@/components/tasks/task-status'
import { TaskPriorityBadge } from '@/components/tasks/task-priority'
import { cn } from '@/lib/utils'
import { Task } from '@jungle/types'

interface TaskInfoProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export function TaskInfo({ task, isOpen, onClose }: TaskInfoProps) {
  if (!task) return null

  return (
    <div className={cn(
      'w-full relative border bg-card h-full border-input rounded-md p-2 shadow-lg transition-all duration-300 ease-in-out flex flex-col', {
      'opacity-100': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    })}>
      <header className="flex items-center justify-end">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="size-4" />
        </Button>
      </header>
      <main className="space-y-6">
        <div className="gap-2">
          <h1 className="text-xl font-semibold text-center">{task.title}</h1>
          <p className="text-sm text-muted-foreground text-center">{task.description}</p>
        </div>
        <div className="flex items-center justify-between p-2 gap-4 w-full border border-input rounded-lg">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <User className="size-5" />
              <div>
                <div className="text-sm text-muted-foreground">Responsável</div>
                <div className="font-medium">okok</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-5" />
              <div>
                <div className="text-sm text-muted-foreground">Data de vencimento</div>
                <div className="font-medium">{formatTaskDeadline(task.deadline)}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <TaskStatusBadge status={task.status} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="text-sm text-muted-foreground">Prioridade</div>
                <TaskPriorityBadge priority={task.priority} />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="comments" className="flex flex-col absolute bottom-0 left-0 min-h-[350px] right-0">
          <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              Comentários
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="size-4" />
              Histórico
            </TabsTrigger>
          </TabsList>
          <TaskComments
            taskId={task.id}
          />
          <HistoryTask
            taskId={task.id} />
        </Tabs>
      </main>
    </div>
  )
}
