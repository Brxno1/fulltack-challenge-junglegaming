import { Badge } from '@/components/ui/badge'
import { TaskStatus } from '@jungle/types'
import { cn } from '@/lib/utils'
import { Circle, Clock, AlertCircle, CheckCircle } from 'lucide-react'

const statusConfig = {
 [TaskStatus.TODO]: {
  label: 'A Fazer',
  icon: Circle,
  className: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
 },
 [TaskStatus.IN_PROGRESS]: {
  label: 'Em Andamento',
  icon: Clock,
  className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
 },
 [TaskStatus.REVIEW]: {
  label: 'Em Revisão',
  icon: AlertCircle,
  className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
 },
 [TaskStatus.DONE]: {
  label: 'Concluída',
  icon: CheckCircle,
  className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
 },
} as const

interface TaskStatusBadgeProps {
 status: TaskStatus
 className?: string
}

export function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
 const config = statusConfig[status]
 const Icon = config.icon

 return (
  <Badge
   className={cn(config.className, className)}
  >
   <Icon className="w-3 h-3 mr-1" />
   {config.label}
  </Badge>
 )
}
