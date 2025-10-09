import { TaskPriority, TaskStatus } from '@/tasks/constants/task.enums'

// Tasks
export interface Task {
  createdBy: string
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
  createdBy: string
  title: string
  description?: string | null
  deadline?: Date | null
  priority: TaskPriority
  status: TaskStatus
}

export type UpdateTaskData = Partial<CreateTaskData>

// Tasks comments
export interface TaskComment {
  id: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface PaginatedTaskComments {
  comments: TaskComment[]
  total: number
}

export interface ListTaskCommentsParams {
  taskId: string
  page: number
  size: number
}

export interface CreateTaskCommentData {
  taskId: string
  userId: string
  content: string
}
