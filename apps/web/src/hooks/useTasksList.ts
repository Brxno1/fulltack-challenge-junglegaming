import { useQuery } from '@tanstack/react-query'
import { getTasks } from '@/lib/api/tasks'
import { Task } from '@jungle/types'
import { useAuthStore } from '@/store/auth-store'

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
  const user = useAuthStore((state) => state.user)

  return useQuery<PaginatedTasks>({
    queryKey: ['tasks', 'list', params ?? {}],
    queryFn: async () => {
      const response = await getTasks(params ?? {})
      return response
    },
    enabled: !!user,
    placeholderData: (prev) => prev,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: false,
  })
}


