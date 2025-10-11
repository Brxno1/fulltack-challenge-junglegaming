import type { TaskEvent, TaskEventType } from '../task'

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
