export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TASK_EVENT_TYPES {
  TASK_CREATED = 'task.created',
  TASK_UPDATED = 'task.updated',
  TASK_DELETED = 'task.deleted',
  TASK_COMMENT_CREATED = 'task.comment.created',
  TASK_ASSIGNMENT_CREATED = 'task.assignment.created',
  TASK_ASSIGNMENT_REMOVED = 'task.assignment.removed',
}

export interface Task {
  id: string
  title: string
  description: string | null
  deadline: Date | null
  priority: TaskPriority
  status: TaskStatus
  actor: string
  createdAt: Date
  updatedAt: Date
}

export interface TaskComment {
  id: string
  taskId: string
  actor: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// Pagination types
export interface PaginatedTasks {
  tasks: Task[]
  total: number
}

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
  actor: string
  content: string
}

export interface TaskAssignment {
  id: string
  taskId: string
  actor: string
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

export interface CreateTaskAssignmentData {
  taskId: string
  actor: string
  assignedBy: string
}

export interface TaskAuditLog {
  id: string
  taskId: string
  actor: string | null
  action: string
  field: string | null
  oldValue: unknown | null
  newValue: unknown | null
  createdAt: Date
}

export interface CreateTaskAuditLogData {
  taskId: string
  actor: string | null
  action: string
  field: string | null
  oldValue: unknown | null
  newValue: unknown | null
}

export interface PaginatedTaskAuditLogs {
  auditLogs: TaskAuditLog[]
  total: number
}

export interface ListTaskAuditLogsParams {
  taskId: string
  page: number
  size: number
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

export interface TaskDeletedEvent {
  taskId: string
  actor: string
  deletedAt: Date
}

export interface TaskCommentCreatedEvent {
  commentId: string
  taskId: string
  actor: string
  content: string
  createdAt: Date
}

export interface TaskAssignmentCreatedEvent {
  assignmentId: string
  taskId: string
  assignedUserId: string
  assignedBy: string
  taskTitle: string
  assignedAt: Date
}

export interface TaskAssignmentRemovedEvent {
  assignmentId: string
  taskId: string
  removedUserId: string
  removedBy: string
  taskTitle: string
  removedAt: Date
}

export type TaskEvent =
  | TaskCreatedEvent
  | TaskUpdatedEvent
  | TaskCommentCreatedEvent
  | TaskAssignmentCreatedEvent
  | TaskAssignmentRemovedEvent
  | TaskDeletedEvent

export type TaskEventType = TASK_EVENT_TYPES
