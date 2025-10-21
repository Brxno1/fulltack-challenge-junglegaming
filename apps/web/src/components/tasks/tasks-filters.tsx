import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface TasksFiltersProps {
 activeFilter: string
 onFilterChange: (filter: string) => void
 counts: {
  todo: number
  inProgress: number
  completed: number
 }
}

export function TasksFilters({ activeFilter, onFilterChange, counts }: TasksFiltersProps) {
 const filters = [
  { key: 'todo', label: 'To-do', count: counts.todo },
  { key: 'in_progress', label: 'In progress', count: counts.inProgress },
  { key: 'completed', label: 'Completed', count: counts.completed },
 ]

 return (
  <div className="flex gap-3 mb-6">
   {filters.map((filter) => (
    <Button
     key={filter.key}
     variant={activeFilter === filter.key ? 'default' : 'outline'}
     size="sm"
     onClick={() => onFilterChange(filter.key)}
     className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
    >
     {filter.label}
     <Badge variant="secondary" className="ml-1 bg-muted text-muted-foreground">
      {filter.count}
     </Badge>
    </Button>
   ))}
  </div>
 )
}
