import { TaskPriority, TaskStatus } from '@/tasks/constants/task.enums'

export interface Task {
  id: string
  title: string
  description: string | null
  deadline: Date | null
  priority: TaskPriority
  status: TaskStatus
}

export interface PaginatedTasks {
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

export type UpdateTaskData = Partial<CreateTaskData>
