import type { TaskEvent } from '@jungle/types'

export abstract class MessagingRepository {
  abstract publishEvent(routingKey: string, message: TaskEvent): Promise<void>
}
