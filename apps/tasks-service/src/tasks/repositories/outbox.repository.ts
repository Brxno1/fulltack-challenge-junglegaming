import { CreateOutboxEventData, OutboxEvent } from '@/types'

export abstract class OutboxRepository {
  abstract create(data: CreateOutboxEventData): Promise<{ id: string }>
  abstract findPending(limit?: number): Promise<OutboxEvent[]>
  abstract markAsPublished(id: string): Promise<void>
  abstract markAsFailed(id: string, errorMessage: string): Promise<void>
  abstract incrementRetryCount(id: string): Promise<void>
  abstract cleanupOldPublishedEvents(): Promise<number>
}
