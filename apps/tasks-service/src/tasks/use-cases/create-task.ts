import { Injectable } from '@nestjs/common'

import type { CreateTaskData } from '@/types'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly tasks: TasksRepository) {}

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

    return { id }
  }
}
