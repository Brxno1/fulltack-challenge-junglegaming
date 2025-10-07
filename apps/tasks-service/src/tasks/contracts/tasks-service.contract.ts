import {
  CreateTaskData,
  ListTasksParams,
  PaginatedTasks,
  Task,
  UpdateTaskData,
} from '@/types'

export abstract class TasksServiceContract {
  abstract findById(id: string): Promise<Task>

  abstract list(params: ListTasksParams): Promise<PaginatedTasks>

  abstract create(data: CreateTaskData): Promise<{ id: string }>

  abstract update(id: string, data: UpdateTaskData): Promise<void>

  abstract delete(id: string): Promise<void>
}
