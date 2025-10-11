import { Injectable, Logger } from '@nestjs/common'

import { MessagingRepository } from '@/tasks/repositories/messaging.repository'
import type { TaskCreatedEvent, TaskUpdatedEvent } from '@/types/task-events'
import { TASK_EVENT_TYPES } from '@/types/task-events'

import { TaskEventsContract } from '../contracts/task-events.contract'

@Injectable()
export class TaskEventsPublisher implements TaskEventsContract {
  private readonly logger = new Logger(TaskEventsPublisher.name)
  private readonly exchange = 'tasks'

  constructor(private readonly messagingRepository: MessagingRepository) { }

  async publishTaskCreated(event: TaskCreatedEvent): Promise<void> {
    try {
      await this.messagingRepository.publishEvent(
        this.exchange,
        TASK_EVENT_TYPES.TASK_CREATED,
        event,
      )
      this.logger.log(
        `Published ${TASK_EVENT_TYPES.TASK_CREATED} event for task ${event.taskId}`,
      )
    } catch (error) {
      this.logger.error(
        `Failed to publish ${TASK_EVENT_TYPES.TASK_CREATED} event`,
        error,
      )
      throw error
    }
  }

  async publishTaskUpdated(event: TaskUpdatedEvent): Promise<void> {
    try {
      await this.messagingRepository.publishEvent(
        this.exchange,
        TASK_EVENT_TYPES.TASK_UPDATED,
        event,
      )
      this.logger.log(
        `Published ${TASK_EVENT_TYPES.TASK_UPDATED} event for task ${event.taskId}`,
      )
    } catch (error) {
      this.logger.error(
        `Failed to publish ${TASK_EVENT_TYPES.TASK_UPDATED} event`,
        error,
      )
      throw error
    }
  }
}
