import { Badge } from '@/components/ui/badge'
import { TaskPriority } from '@jungle/types'
import { cn } from '@/lib/utils'
import { Flag, AlertTriangle, Zap } from 'lucide-react'

const priorityConfig = {
 [TaskPriority.LOW]: {
  label: 'Baixa',
  icon: Flag,
  className: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
 },
 [TaskPriority.MEDIUM]: {
  label: 'Média',
  icon: Flag,
  className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
 },
 [TaskPriority.HIGH]: {
  label: 'Alta',
  icon: AlertTriangle,
  className: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700',
 },
 [TaskPriority.URGENT]: {
  label: 'Urgente',
  icon: Zap,
  className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
 },
} as const

interface TaskPriorityBadgeProps {
 priority: TaskPriority
 className?: string
}

export function TaskPriorityBadge({ priority, className }: TaskPriorityBadgeProps) {
 const config = priorityConfig[priority]
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
