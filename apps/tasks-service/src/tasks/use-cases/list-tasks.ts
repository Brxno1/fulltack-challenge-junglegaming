import { Injectable } from '@nestjs/common'

import { ListTasksParams, PaginatedTasks } from '@/types/tasks'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class ListTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) { }

  async execute(params: ListTasksParams): Promise<PaginatedTasks> {
    return this.tasksRepository.list(params)
  }
}
