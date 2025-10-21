import { useQuery } from '@tanstack/react-query'
import { getTasks } from '@/lib/api/tasks'
import { Task } from '@jungle/types'

interface ListTasksParams {
 page?: number
 limit?: number
 status?: string
 priority?: string
 search?: string
}


interface PaginatedTasks {
 tasks: Task[]
 total: number
}

export function useTasksList(params?: ListTasksParams) {
 return useQuery<PaginatedTasks>({
  queryKey: ['tasks', 'list', params ?? {}],
  queryFn: async () => {
    const response = await getTasks(params ?? {})
    return response
  },
  placeholderData: (prev) => prev,
  staleTime: 30_000,
  gcTime: 5 * 60_000, 
 })
}


