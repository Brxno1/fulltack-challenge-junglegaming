import { Injectable } from '@nestjs/common'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly tasks: TasksRepository) {}

  async execute(id: string): Promise<void> {
    await this.tasks.delete(id)
  }
}
