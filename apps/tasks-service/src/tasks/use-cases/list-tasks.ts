import { Injectable } from '@nestjs/common'

import { ListTasksParams, PaginatedResult } from '@/types'

import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class ListTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute(params: ListTasksParams): Promise<PaginatedResult> {
    return this.tasksRepository.list(params)
  }
}
