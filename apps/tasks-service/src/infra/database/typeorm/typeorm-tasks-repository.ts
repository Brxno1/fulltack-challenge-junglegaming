import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Task } from '@/tasks/entities/tasks.entity'
import { TasksRepository } from '@/tasks/repositories/tasks.repository'
import type {
  CreateTaskData,
  ListTasksParams,
  PaginatedTasks,
  UpdateTaskData,
} from '@/types'

@Injectable()
export class TypeormTasksRepository implements TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly task: Repository<Task>,
  ) {}

  findById(id: string): Promise<Task | null> {
    return this.task.findOne({ where: { id } })
  }

  async create(data: CreateTaskData): Promise<{ id: string }> {
    const createdTask = await this.task.save(data)
    return { id: createdTask.id }
  }

  async list(params: ListTasksParams): Promise<PaginatedTasks> {
    const [tasks, total] = await this.task.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: (params.page - 1) * params.size,
      take: params.size,
    })

    return {
      tasks,
      total,
    }
  }

  async update(id: string, data: UpdateTaskData): Promise<void> {
    await this.task.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.task.delete(id)
  }
}
