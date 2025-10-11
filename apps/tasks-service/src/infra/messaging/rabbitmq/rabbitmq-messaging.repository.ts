import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { MessagingRepository } from '@/tasks/repositories/messaging.repository'
import type { TaskEvent } from '@jungle/types'

@Injectable()
export class RabbitMQMessagingRepository implements MessagingRepository {
  private readonly logger = new Logger(RabbitMQMessagingRepository.name)

  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) { }

  async publishEvent(
    exchange: string,
    routingKey: string,
    message: TaskEvent,
  ): Promise<void> {
    try {
      this.client.emit(routingKey, message)
      this.logger.log(`Published message to ${exchange} (${routingKey})`)
    } catch (error) {
      this.logger.error('Failed to publish message', error)
      throw error
    }
  }
}
