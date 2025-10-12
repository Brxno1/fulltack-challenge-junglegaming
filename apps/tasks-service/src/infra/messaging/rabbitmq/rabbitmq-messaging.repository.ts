import type { TaskEvent } from '@jungle/types'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { MessagingRepository } from '@/tasks/repositories/messaging.repository'

@Injectable()
export class RabbitMQMessagingRepository implements MessagingRepository {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) {}

  async publishEvent(routingKey: string, message: TaskEvent): Promise<void> {
    this.client.emit(routingKey, message)
  }
}
