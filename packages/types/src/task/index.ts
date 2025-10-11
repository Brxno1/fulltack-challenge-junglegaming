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

export interface Task {
  id: string
  title: string
  description: string | null
  deadline: Date | null
  priority: TaskPriority
  status: TaskStatus
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface TaskComment {
  id: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// Pagination types
export interface PaginatedTasks {
  tasks: Task[]
  total: number
}

export interface PaginatedTaskComments {
  comments: TaskComment[]
  total: number
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
  userId: string
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

export enum TASK_EVENT_TYPES {
  TASK_CREATED = 'task.created',
  TASK_UPDATED = 'task.updated',
  TASK_DELETED = 'task.deleted',
  TASK_COMMENT_CREATED = 'task.comment.created',
  TASK_ASSIGNMENT_CREATED = 'task.assignment.created',
  TASK_ASSIGNMENT_REMOVED = 'task.assignment.removed',
}

export type TaskEventType = TASK_EVENT_TYPES
