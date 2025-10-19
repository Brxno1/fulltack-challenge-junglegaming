import { ListTasksParams, PaginatedTasks } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class ListTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(params: ListTasksParams): Promise<PaginatedTasks> {
    return this.tasksRepository.list(params)
  }
}
