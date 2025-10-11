import {
  CreateTaskData,
  ListTasksParams,
  PaginatedTasks,
  Task,
  UpdateTaskData,
} from '@/types/tasks'

export abstract class TasksServiceContract {
  abstract findById(taskId: string): Promise<Task>

  abstract list(params: ListTasksParams): Promise<PaginatedTasks>

  abstract create(data: CreateTaskData): Promise<{ id: string }>

  abstract update(
    taskId: string,
    actor: string,
    data: UpdateTaskData,
  ): Promise<void>

  abstract delete(taskId: string, actor: string): Promise<void>
}
