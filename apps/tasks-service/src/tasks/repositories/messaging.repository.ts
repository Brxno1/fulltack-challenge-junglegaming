import type { TaskEvent } from '@jungle/types'

export abstract class MessagingRepository {
  abstract publishEvent(
    exchange: string,
    routingKey: string,
    message: TaskEvent,
  ): Promise<void>
}
