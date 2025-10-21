import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, User, MessageSquare, History, X, CheckCircle, Circle, AlertCircle, Flag } from 'lucide-react'
import { TaskComments } from './task-comments'
import { HistoryTask } from './history-task'
import { formatTaskDeadline } from '@/lib/date-utils'
import { getTaskStatusLabel, getTaskPriorityLabel, getTaskStatusVariant, getTaskPriorityVariant } from '@/lib/task-mappings'
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

interface TaskInfoProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export function TaskInfo({ task, isOpen, onClose }: TaskInfoProps) {
  if (!task) return null

  return (
    <div className={cn(
      'w-full border h-full bg-card border-input rounded-md shadow-lg transition-all duration-300 ease-in-out', {
      'opacity-100': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    })}>
      <div className="flex flex-col h-full p-4">
        <header className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-lg font-semibold">Detalhes da Tarefa</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </header>

        <div className="flex flex-col h-full">
          <div className="space-y-2 mb-4">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-muted-foreground">{task.description || 'Sem descrição'}</p>
            <Separator />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="size-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Data de vencimento</div>
                  <div className="font-medium">{formatTaskDeadline(task.deadline)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
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

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {getStatusIcon(task.status)}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge variant={getTaskStatusVariant(task.status)} className="font-medium">
                    {getTaskStatusLabel(task.status)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {getPriorityIcon(task.priority)}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Prioridade</div>
                  <Badge variant={getTaskPriorityVariant(task.priority)} className="font-medium">
                    {getTaskPriorityLabel(task.priority)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <Tabs defaultValue="comments" className="flex flex-col h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comments" className="flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  Comentários
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="size-4" />
                  Histórico
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comments" className="flex-1 rounded-lg p-2 flex flex-col h-full">
                <TaskComments taskId={task.id} />
              </TabsContent>

              <TabsContent value="history" className="flex-1 rounded-lg p-2">
                <HistoryTask taskId={task.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
