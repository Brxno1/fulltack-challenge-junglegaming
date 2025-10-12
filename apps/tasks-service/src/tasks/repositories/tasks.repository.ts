import type { PaginatedTasks, Task } from '@jungle/types'

import type {
  CreateTaskData,
  ListTasksParams,
  UpdateTaskData,
} from '@/types/tasks'

export abstract class TasksRepository {
  abstract findById(id: string): Promise<Task | null>

  abstract list(params: ListTasksParams): Promise<PaginatedTasks>

  abstract create(data: CreateTaskData): Promise<{ id: string }>

  abstract update(id: string, data: UpdateTaskData): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract softDelete(id: string): Promise<void>
}
