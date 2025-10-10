import { Injectable } from '@nestjs/common'

import type { CreateTaskData } from '@/types'

import { TaskEventsContract } from '../events/contracts/task-events.contract'
import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly tasks: TasksRepository,
    private readonly eventsPublisher: TaskEventsContract,
  ) {}

  async execute(input: CreateTaskData): Promise<{ id: string }> {
    const { createdBy, title, description, deadline, priority, status } = input

    const { id } = await this.tasks.create({
      createdBy,
      title,
      description,
      deadline,
      priority,
      status,
    })

    await this.eventsPublisher.publishTaskCreated({
      taskId: id,
      createdBy,
      title,
      priority,
      status,
      createdAt: new Date(),
    })

    return { id }
  }
}
