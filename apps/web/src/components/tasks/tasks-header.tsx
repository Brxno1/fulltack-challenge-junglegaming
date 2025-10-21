
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TasksSearch } from './tasks-search'
import { CreateTaskDialog } from './create-tasks'

interface TasksHeaderProps {
 onNewTask?: () => void
 counts: {
  todo: number
  inProgress: number
  completed: number
 }
}

export function TasksHeader({ counts }: TasksHeaderProps) {
 const filters = [
  { key: 'todo', label: 'Tarefas', count: counts.todo },
  { key: 'in_progress', label: 'Em andamento', count: counts.inProgress },
  { key: 'completed', label: 'Concluídas', count: counts.completed },
 ]

 return (
  <div className="flex items-start justify-between bg-card border border-input rounded-md p-2 mb-2">
   <div className="flex items-start flex-col gap-2">
    <TasksSearch />
    <div className="flex items-center gap-2">
     {filters.map((filter) => (
      <Button
       key={filter.key}
       variant="outline"
       size="sm"
       className="flex items-center gap-2.5 p-3 rounded-md font-medium"
      >
       {filter.label}
       <Badge variant="secondary" className="ml-1 bg-muted text-muted-foreground">
        {filter.count}
       </Badge>
      </Button>
     ))}
    </div>
   </div>
   <div className="flex items-center">
    <CreateTaskDialog />
   </div>
  </div>
 )
}
