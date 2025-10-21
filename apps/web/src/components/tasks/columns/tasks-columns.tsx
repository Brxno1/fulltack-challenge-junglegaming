import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Clock, User } from 'lucide-react'

import { formatTaskDeadline } from '@/lib/date-utils'
import {
  getTaskStatusLabel,
  getTaskPriorityLabel,
  getTaskStatusVariant,
  getTaskPriorityVariant
} from '@/lib/task-mappings'
import { Task } from '@jungle/types'

export const tasksColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Tarefa',
    cell: ({ row }) => {
      const task = row.original
      return (
        <div className="space-y-2">
          <div className="font-semibold text-lg">{task.title}</div>
          <div className="text-sm text-muted-foreground max-w-[400px]">
            {task.description || 'Sem descrição'}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatTaskDeadline(task.deadline)}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              Responsável
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'priority',
    header: 'Prioridade',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string
      const variant = getTaskPriorityVariant(priority) as "default" | "secondary" | "destructive" | "outline"
      const label = getTaskPriorityLabel(priority)

      return (
        <Badge variant={variant} className="font-medium">
          {label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const variant = getTaskStatusVariant(status) as "default" | "secondary" | "destructive" | "outline"
      const label = getTaskStatusLabel(status)

      return (
        <Badge variant={variant} className="font-medium">
          {label}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: () => (
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
]
