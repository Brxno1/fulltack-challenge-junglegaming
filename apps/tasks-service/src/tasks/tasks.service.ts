import { Injectable } from '@nestjs/common'

import { CreateTaskData, ListTasksParams, Task, UpdateTaskData } from '@/types'

import { TasksServiceContract } from './contracts/tasks-service.contract'
import { CreateTaskUseCase } from './use-cases/create-task'
import { DeleteTaskUseCase } from './use-cases/delete-task'
import { GetTaskByIdUseCase } from './use-cases/get-task-by-id'
import { ListTasksUseCase } from './use-cases/list-tasks'
import { UpdateTaskUseCase } from './use-cases/update-tasks'

@Injectable()
export class TasksService implements TasksServiceContract {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async findById(id: string): Promise<Task> {
    return this.getTaskByIdUseCase.execute(id)
  }

  async list(params: ListTasksParams) {
    return this.listTasksUseCase.execute(params)
  }

  async create(data: CreateTaskData) {
    return this.createTaskUseCase.execute(data)
  }

  async update(id: string, data: UpdateTaskData): Promise<void> {
    return this.updateTaskUseCase.execute(id, data)
  }

  async delete(id: string): Promise<void> {
    return this.deleteTaskUseCase.execute(id)
  }
}
