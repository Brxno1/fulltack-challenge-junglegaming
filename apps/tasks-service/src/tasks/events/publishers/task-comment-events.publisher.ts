import { Injectable, Logger } from '@nestjs/common'

import { MessagingRepository } from '@/tasks/repositories/messaging.repository'
import type { TaskCommentCreatedEvent } from '@/types/task-events'
import { TASK_EVENT_TYPES } from '@/types/task-events'

import { TaskCommentEventsContract } from '../contracts/task-comment-events.contract'

@Injectable()
export class TaskCommentEventsPublisher implements TaskCommentEventsContract {
  private readonly logger = new Logger(TaskCommentEventsPublisher.name)
  private readonly exchange = 'tasks'

  constructor(private readonly messagingRepository: MessagingRepository) { }

  async publishTaskCommentCreated(
    event: TaskCommentCreatedEvent,
  ): Promise<void> {
    try {
      await this.messagingRepository.publishEvent(
        this.exchange,
        TASK_EVENT_TYPES.TASK_COMMENT_CREATED,
        event,
      )
      this.logger.log(
        `Published ${TASK_EVENT_TYPES.TASK_COMMENT_CREATED} event for comment ${event.commentId}`,
      )
    } catch (error) {
      this.logger.error(
        `Failed to publish ${TASK_EVENT_TYPES.TASK_COMMENT_CREATED} event`,
        error,
      )
      throw error
    }
  }
}
