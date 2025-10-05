import { Injectable } from '@nestjs/common'

import { CreateTaskData, ListTasksParams } from '@/types'

import { CreateTaskUseCase } from './use-cases/create-task'
import { ListTasksUseCase } from './use-cases/list-tasks'

@Injectable()
export class TaskService {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
  ) {}

  async create(data: CreateTaskData) {
    return this.createTaskUseCase.execute(data)
  }

  async list(params: ListTasksParams) {
    return this.listTasksUseCase.execute(params)
  }
}
