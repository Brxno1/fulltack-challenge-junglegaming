import { TabsContent } from '../ui/tabs'

interface HistoryTaskProps {
 taskId: string
}

export function HistoryTask({ taskId }: HistoryTaskProps) {
 return (
  <TabsContent value="history" className="flex flex-col items-center justify-center flex-1">
   
  </TabsContent>
 )
}
