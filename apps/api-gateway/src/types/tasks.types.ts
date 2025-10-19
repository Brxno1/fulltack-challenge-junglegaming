import { TaskPriority, TaskStatus } from '@jungle/types'

export interface ListTasksParams {
  page: number
  size: number
}

export interface CreateTaskData {
  actor: string
  title: string
  description?: string | null
  deadline?: Date | null
  priority: TaskPriority
  status: TaskStatus
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  actor: string
}
