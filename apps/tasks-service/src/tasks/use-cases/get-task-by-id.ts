import { Injectable, NotFoundException } from '@nestjs/common'

import { Task } from '@/types/tasks'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class GetTaskByIdUseCase {
  constructor(private readonly tasks: TasksRepository) { }

  async execute(id: string): Promise<Task> {
    const task = await this.tasks.findById(id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }
}
