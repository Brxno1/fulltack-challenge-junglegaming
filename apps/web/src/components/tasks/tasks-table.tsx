import { useState } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Clock, User } from 'lucide-react'
import { formatTaskDeadline } from '@/lib/date-utils'
import { TaskStatusBadge } from '@/components/tasks/task-status'
import { TaskPriorityBadge } from '@/components/tasks/task-priority'
import { Task } from '@jungle/types'

interface TasksTableProps {
  data: Task[]
  columns: ColumnDef<Task>[]
  isLoading?: boolean
  onTaskClick?: (task: Task) => void
}

export function TasksTable({ data, columns, isLoading, onTaskClick }: TasksTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Nenhuma tarefa encontrada
      </div>
    )
  }

  return (
    <div className="w-full bg-card border border-input rounded-md overflow-y-auto max-h-[calc(100vh-9.8rem)] p-2">
      <div className="grid gap-2">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="border rounded-lg p-4 hover:bg-muted/50 gap-2 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex-1 cursor-pointer pr-4"
                  onClick={() => onTaskClick?.(row.original)}
                >
                  <h3 className="text-lg font-semibold mb-2">{row.original.title}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {formatTaskDeadline(row.original.deadline)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      Responsável
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4">
                  <TaskPriorityBadge priority={row.original.priority} />
                  <TaskStatusBadge status={row.original.status} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Nenhuma tarefa encontrada
          </div>
        )}
      </div>
    </div>
  )
}
