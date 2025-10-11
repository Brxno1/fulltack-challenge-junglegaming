import type { TaskEvent } from '@/types/task-events'

export abstract class MessagingRepository {
  abstract publishEvent(
    exchange: string,
    routingKey: string,
    message: TaskEvent,
  ): Promise<void>
}
