import { TaskPriority, TaskStatus } from '@/tasks/constants/task.enums'
import { Task } from '@/tasks/entities/tasks.entity'

export interface PaginatedResult {
  tasks: Task[]
  total: number
}

export interface ListTasksParams {
  page: number
  size: number
}

export interface CreateTaskData {
  title: string
  description?: string | null
  deadline?: Date | null
  priority: TaskPriority
  status: TaskStatus
}
