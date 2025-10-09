import { Injectable } from '@nestjs/common'

import type {
  CreateTaskData,
  ListTasksParams,
  PaginatedTasks,
  Task,
  UpdateTaskData,
} from '@/types'

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
    const task = await this.getTaskByIdUseCase.execute(id)

    return task
  }

  async list(params: ListTasksParams): Promise<PaginatedTasks> {
    const { page, size } = params

    const { tasks, total } = await this.listTasksUseCase.execute({
      page,
      size,
    })

    return { tasks, total }
  }

  async create(data: CreateTaskData): Promise<{ id: string }> {
    const { createdBy, title, description, deadline, priority, status } = data

    const { id } = await this.createTaskUseCase.execute({
      createdBy,
      title,
      description,
      deadline,
      priority,
      status,
    })

    return { id }
  }

  async update(id: string, data: UpdateTaskData): Promise<void> {
    const { title, description, deadline, priority, status } = data

    await this.updateTaskUseCase.execute(id, {
      title,
      description,
      deadline,
      priority,
      status,
    })
  }

  async delete(id: string): Promise<void> {
    return this.deleteTaskUseCase.execute(id)
  }
}
