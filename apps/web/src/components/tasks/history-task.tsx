import { History } from 'lucide-react'

interface HistoryTaskProps {
 taskId: string
}

export function HistoryTask({ taskId }: HistoryTaskProps) {
 return (
  <div className="text-center py-8 text-muted-foreground h-full">
   <History className="size-12 mx-auto mb-4 opacity-50" />
   <p>Histórico da tarefa será implementado em breve</p>
  </div>
 )
}
