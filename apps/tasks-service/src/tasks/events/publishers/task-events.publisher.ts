import { Injectable, Logger } from '@nestjs/common'

import { RabbitMQService } from '@/infra/messaging/rabbitmq/rabbitmq.service'
import type { TaskCreatedEvent, TaskUpdatedEvent } from '@/types'

import { TaskEventsContract } from '../contracts/task-events.contract'

@Injectable()
export class TaskEventsPublisher implements TaskEventsContract {
  private readonly logger = new Logger(TaskEventsPublisher.name)
  private readonly exchange = 'tasks'

  constructor(private readonly rabbitMQService: RabbitMQService) { }

  async publishTaskCreated(event: TaskCreatedEvent): Promise<void> {
    try {
      await this.rabbitMQService.publishEvent(
        this.exchange,
        'task.created',
        event,
      )
      this.logger.log(`Published task.created event for task ${event.taskId}`)
    } catch (error) {
      this.logger.error('Failed to publish task.created event', error)
      throw error
    }
  }

  async publishTaskUpdated(event: TaskUpdatedEvent): Promise<void> {
    try {
      await this.rabbitMQService.publishEvent(
        this.exchange,
        'task.updated',
        event,
      )
      this.logger.log(`Published task.updated event for task ${event.taskId}`)
    } catch (error) {
      this.logger.error('Failed to publish task.updated event', error)
      throw error
    }
  }
}
