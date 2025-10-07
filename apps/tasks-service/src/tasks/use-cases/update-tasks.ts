import { Injectable } from '@nestjs/common'

import { UpdateTaskData } from '@/types'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly tasks: TasksRepository) {}

  async execute(id: string, data: UpdateTaskData): Promise<void> {
    await this.tasks.update(id, data)
  }
}
