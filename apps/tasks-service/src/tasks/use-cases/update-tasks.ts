import { Injectable } from '@nestjs/common'

import type { UpdateTaskData } from '@/types'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly tasks: TasksRepository) {}

  async execute(id: string, data: UpdateTaskData): Promise<void> {
    const { title, description, deadline, priority, status } = data

    await this.tasks.update(id, {
      title,
      description,
      deadline,
      priority,
      status,
    })
  }
}
