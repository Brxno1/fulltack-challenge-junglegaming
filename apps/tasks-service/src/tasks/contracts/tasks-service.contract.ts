import {
  CreateTaskData,
  ListTasksParams,
  PaginatedTasks,
  Task,
  UpdateTaskData,
} from '@jungle/types'

export abstract class TasksServiceContract {
  abstract findById(taskId: string): Promise<Task>

  abstract list(params: ListTasksParams): Promise<PaginatedTasks>

  abstract create(data: CreateTaskData): Promise<{ id: string }>

  abstract update(taskId: string, data: UpdateTaskData): Promise<void>

  abstract delete(taskId: string, actor: string): Promise<void>
}
