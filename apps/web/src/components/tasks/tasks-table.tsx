import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Clock, User } from 'lucide-react'
import { formatTaskDeadline } from '@/lib/date-utils'
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
    <div className="w-full bg-card border border-input rounded-md overflow-y-auto max-h-[calc(100vh-10rem)] p-2">
      <div className="grid gap-2">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="border rounded-lg p-4 hover:bg-muted/50 gap-2 transition-colors cursor-pointer shadow-sm"
              onClick={() => onTaskClick?.(row.original)}
            >
              <div className="flex items-start justify-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{row.original.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {row.getVisibleCells()
                    .filter(cell => cell.column.id === 'priority')
                    .map((cell) => (
                      <div key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    ))}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
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
