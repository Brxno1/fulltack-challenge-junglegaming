import type { Task } from '@/tasks/entities/task.entity'
import type { CreateTaskData, ListTasksParams, PaginatedResult } from '@/types'

export type UpdateTaskData = Partial<CreateTaskData>

export abstract class TasksRepository {
  abstract findById(id: string): Promise<Task | null>

  abstract list(params: ListTasksParams): Promise<PaginatedResult>

  abstract create(data: CreateTaskData): Promise<{ id: string }>

  abstract update(id: string, data: UpdateTaskData): Promise<void>

  abstract delete(id: string): Promise<void>
}
