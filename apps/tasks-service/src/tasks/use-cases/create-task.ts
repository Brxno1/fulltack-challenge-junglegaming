import { Injectable } from '@nestjs/common'

import type { CreateTaskData } from '@/types'

import { TaskStatus } from '../constants/task.enums'
import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly tasks: TasksRepository) {}

  async execute(input: CreateTaskData): Promise<{ id: string }> {
    const { title, description, deadline, priority, status } = input

    const created = await this.tasks.create({
      title,
      description: description ?? null,
      deadline: deadline ?? null,
      priority,
      status: status.toUpperCase() as TaskStatus,
    })

    return { id: created.id }
  }
}
