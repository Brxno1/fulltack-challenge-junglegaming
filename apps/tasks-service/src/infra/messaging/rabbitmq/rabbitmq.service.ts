import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import type {
  TaskCommentCreatedEvent,
  TaskCreatedEvent,
  TaskEvent,
} from '@/types'

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name)

  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
  ) { }

  async publishTaskCreated(event: TaskCreatedEvent): Promise<void> {
    try {
      this.client.emit('task.created', event)
      this.logger.log(`Published task.created event for task ${event.taskId}`)
    } catch (error) {
      this.logger.error('Failed to publish task.created event', error)
      throw error
    }
  }

  async TaskCommentServiceContract(
    event: TaskCommentCreatedEvent,
  ): Promise<void> {
    try {
      this.client.emit('task.comment.created', event)
      this.logger.log(
        `Published task.comment.created event for comment ${event.commentId}`,
      )
    } catch (error) {
      this.logger.error('Failed to publish task.comment.created event', error)
      throw error
    }
  }

  async publishEvent(
    exchange: string,
    routingKey: string,
    message: TaskEvent,
  ): Promise<void> {
    try {
      this.client.emit(routingKey, message)
      this.logger.log(`Published message to ${exchange}.${routingKey}`)
    } catch (error) {
      this.logger.error('Failed to publish message', error)
      throw error
    }
  }
}
