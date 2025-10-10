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

// RabbitMQ Events
export interface TaskCreatedEvent {
  type: 'task.created'
  taskId: string
  createdBy: string
  title: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: Date
}

export interface TaskUpdatedEvent {
  type: 'task.updated'
  taskId: string
  updatedBy: string
  changes: Partial<{
    title: string
    description: string | null
    deadline: Date | null
    priority: TaskPriority
    status: TaskStatus
  }>
  updatedAt: Date
}

export interface TaskCommentCreatedEvent {
  type: 'task.comment.created'
  commentId: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
}

export type TaskEvent =
  | TaskCreatedEvent
  | TaskUpdatedEvent
  | TaskCommentCreatedEvent

export const TASK_EVENT_TYPES = {
  TASK_CREATED: 'task.created',
  TASK_UPDATED: 'task.updated',
  TASK_COMMENT_CREATED: 'task.comment.created',
} as const
