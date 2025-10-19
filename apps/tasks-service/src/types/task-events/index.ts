import { TaskPriority, TaskStatus } from '@/tasks/constants/task.enums'

// Task Events
export interface TaskCreatedEvent {
  taskId: string
  author: string
  title: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: Date
}

export interface TaskUpdatedEvent {
  taskId: string
  author: string
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
  author: string
  deletedAt: Date
}

// Comment Events
export interface TaskCommentCreatedEvent {
  commentId: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
}

// Assignment Events
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

// Event Types Union
export type TaskEvent =
  | TaskCreatedEvent
  | TaskUpdatedEvent
  | TaskCommentCreatedEvent
  | TaskAssignmentCreatedEvent
  | TaskAssignmentRemovedEvent
  | TaskDeletedEvent

// Event Type Constants
export enum TASK_EVENT_TYPES {
  TASK_CREATED = 'task.created',
  TASK_UPDATED = 'task.updated',
  TASK_DELETED = 'task.deleted',
  TASK_COMMENT_CREATED = 'task.comment.created',
  TASK_ASSIGNMENT_CREATED = 'task.assignment.created',
  TASK_ASSIGNMENT_REMOVED = 'task.assignment.removed',
}

export type TaskEventType = TASK_EVENT_TYPES
