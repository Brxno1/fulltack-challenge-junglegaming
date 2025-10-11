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
  taskId: string
  actor: string
  title: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: Date
}

export interface TaskUpdatedEvent {
  taskId: string
  actor: string
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
  commentId: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
}

export interface TaskDeletedEvent {
  taskId: string
  actor: string
  deletedAt: Date
}

export type TaskEvent =
  | TaskCreatedEvent
  | TaskUpdatedEvent
  | TaskCommentCreatedEvent
  | TaskDeletedEvent

export enum TASK_EVENT_TYPES {
  TASK_CREATED = 'task.created',
  TASK_UPDATED = 'task.updated',
  TASK_DELETED = 'task.deleted',
  TASK_COMMENT_CREATED = 'task.comment.created',
}

export type TaskEventType = TASK_EVENT_TYPES

// Tasks assignments
export interface CreateTaskAssignmentData {
  taskId: string
  userId: string
  assignedBy: string
}

export interface TaskAssignment {
  id: string
  taskId: string
  userId: string
  createdAt: Date
}

export interface PaginatedTaskAssignments {
  assignments: TaskAssignment[]
  total: number
}

export interface ListTaskAssignmentsParams {
  taskId: string
  page: number
  size: number
}

// Outbox Events
export enum OutboxEventStatus {
  PENDING = 'pending',
  PUBLISHED = 'published',
  FAILED = 'failed',
}

export interface OutboxEvent {
  id: string
  aggregateId: string
  type: TaskEventType
  data: TaskEvent
  status: OutboxEventStatus
  retryCount: number
  errorMessage: string | null
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
}

export interface CreateOutboxEventData {
  aggregateId: string
  type: TaskEventType
  data: TaskEvent
}
