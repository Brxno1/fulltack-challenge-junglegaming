import { QueryClient } from '@tanstack/react-query'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 5,
        retry: 3,
      },
    },
  })
}

export const queryKeys = {
  tasks: {
    all: ['tasks'] as const,
    lists: () => [...queryKeys.tasks.all, 'list'] as const,
    list: (filters: unknown) => [...queryKeys.tasks.lists(), { filters }] as const,
    details: () => [...queryKeys.tasks.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tasks.details(), id] as const,
  },

  taskMutations: {
    create: ['create-task'] as const,
    update: ['update-task'] as const,
    delete: ['delete-task'] as const,
    deleteById: (id: string) => [...queryKeys.taskMutations.delete, id] as const,
  },
} as const

export const taskInvalidations = {
  all: () => queryKeys.tasks.all,
  lists: () => queryKeys.tasks.lists(),
  detail: (id: string) => queryKeys.tasks.detail(id),
}
