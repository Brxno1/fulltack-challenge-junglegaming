import { useQuery } from '@tanstack/react-query'
import { getTaskById } from '@/lib/api/tasks'
import { queryKeys } from '@/lib/query-client'
import type { Task } from '@jungle/types'

export function useTaskByIdQuery(taskId: string | undefined) {
 return useQuery<Task>({
  queryKey: taskId ? queryKeys.tasks.detail(taskId) : queryKeys.tasks.details(),
  queryFn: () => getTaskById(taskId ?? ''),
  enabled: Boolean(taskId),
  staleTime: 30_000,
 })
}


