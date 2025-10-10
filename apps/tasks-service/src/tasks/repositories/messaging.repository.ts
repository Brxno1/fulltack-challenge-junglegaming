import type { TaskEvent } from '@/types'

export abstract class MessagingRepository {
  abstract publishEvent(
    exchange: string,
    routingKey: string,
    message: TaskEvent,
  ): Promise<void>
}
