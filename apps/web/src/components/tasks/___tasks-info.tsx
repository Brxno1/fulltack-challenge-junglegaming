import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, User, MessageSquare, History, X, CheckCircle, Circle, AlertCircle, Flag, Edit, Trash } from 'lucide-react'
import { TaskComments } from './task-comments'
import { HistoryTask } from './history-task'
import { formatTaskDeadline } from '@/lib/date-utils'
import { TaskStatusBadge } from '@/components/tasks/task-status'
import { TaskPriorityBadge } from '@/components/tasks/task-priority'
import { cn } from '@/lib/utils'
import { Task } from '@jungle/types'

function getStatusIcon(status: string) {
  switch (status) {
    case 'TODO':
      return <Circle className="size-4 text-blue-500" />
    case 'IN_PROGRESS':
      return <Clock className="size-4 text-yellow-500" />
    case 'REVIEW':
      return <AlertCircle className="size-4 text-red-500" />
    case 'DONE':
      return <CheckCircle className="size-4 text-green-500" />
    default:
      return <Circle className="size-4 text-gray-500" />
  }
}

function getPriorityIcon(priority: string) {
  switch (priority) {
    case 'LOW':
      return <Flag className="size-4 text-green-500" />
    case 'MEDIUM':
      return <Flag className="size-4 text-yellow-500" />
    case 'HIGH':
      return <Flag className="size-4 text-orange-500" />
    case 'URGENT':
      return <AlertCircle className="size-4 text-red-500" />
    default:
      return <Flag className="size-4 text-gray-500" />
  }
}

interface DemoTasksInfoProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export function DemoTasksInfo({ task, isOpen, onClose }: DemoTasksInfoProps) {
  if (!task) return null

  return (
    <div className={cn(
      'w-full border h-full border-input rounded-md shadow-lg transition-all duration-300 ease-in-out flex flex-col', {
      'opacity-100': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    })}>
      <header className="flex items-center justify-end p-2 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="size-4" />
        </Button>
      </header>
    
      <div className="grid grid-rows-[auto_auto_auto_1fr] flex-1 gap-4 min-h-0">
        <div className="space-y-2 px-4">
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-muted-foreground">{task.description || 'Sem descrição'}</p>
        </div>
    
        <div className="flex items-center justify-between gap-2 p-2">
          <Button
            size="sm"
            className="flex items-center gap-2"
          >
            <Edit className="size-4" />
            Editar Tarefa
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-destructive hover:text-destructive"
          >
            <Trash className="size-4" />
            Excluir Tarefa
          </Button>
        </div>
    
        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="space-y-4 bg-card border border-input rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Clock className="size-4" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Data de vencimento</div>
                <div className="font-medium">{formatTaskDeadline(task.deadline)}</div>
              </div>
            </div>
    
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="size-4" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Usuários atribuídos</div>
                <div className="flex gap-1">
                  <div className="w-6 h-6 bg-muted rounded-full" />
                  <div className="w-6 h-6 bg-muted rounded-full" />
                  <div className="w-6 h-6 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </div>
    
          <div className="space-y-4 bg-card border border-input rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                {getStatusIcon(task.status)}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <TaskStatusBadge status={task.status} />
              </div>
            </div>
    
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                {getPriorityIcon(task.priority)}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Prioridade</div>
                <TaskPriorityBadge priority={task.priority} />
              </div>
            </div>
          </div>
        </div>
    
        <div className="flex flex-col min-h-0 flex-1">
          <Tabs defaultValue="comments" className="flex flex-col h-full flex-1 min-h-0">
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
    
            <TabsContent value="comments" className="flex-1 flex flex-col min-h-0 h-full">
              <TaskComments
                taskId={task.id}
              />
            </TabsContent>
    
            <TabsContent value="history" className="flex-1 flex flex-col min-h-0">
              <HistoryTask taskId={task.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    
  )
}
