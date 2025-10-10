import { Injectable, Logger } from '@nestjs/common'

import { RabbitMQService } from '@/infra/messaging/rabbitmq/rabbitmq.service'
import type { TaskCommentCreatedEvent } from '@/types'

import { TaskCommentEventsContract } from '../contracts/task-comment-events.contract'

@Injectable()
export class TaskCommentEventsPublisher implements TaskCommentEventsContract {
  private readonly logger = new Logger(TaskCommentEventsPublisher.name)
  private readonly exchange = 'tasks'

  constructor(private readonly rabbitMQService: RabbitMQService) { }

  async publishTaskCommentCreated(
    event: TaskCommentCreatedEvent,
  ): Promise<void> {
    try {
      await this.rabbitMQService.publishEvent(
        this.exchange,
        'task.comment.created',
        event,
      )
      this.logger.log(
        `Published task.comment.created event for comment ${event.commentId}`,
      )
    } catch (error) {
      this.logger.error('Failed to publish task.comment.created event', error)
      throw error
    }
  }
}
