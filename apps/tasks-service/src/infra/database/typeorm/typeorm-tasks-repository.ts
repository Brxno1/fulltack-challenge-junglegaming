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
} from '@/types/tasks'

@Injectable()
export class TypeormTasksRepository implements TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly task: Repository<Task>,
  ) { }

  findById(taskId: string): Promise<Task | null> {
    return this.task.findOne({ where: { id: taskId } })
  }

  async create(data: CreateTaskData): Promise<{ id: string }> {
    const { id } = await this.task.save(data)
    return { id }
  }

  async list({ page, size }: ListTasksParams): Promise<PaginatedTasks> {
    const [tasks, total] = await this.task.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: (page - 1) * size,
      take: size,
    })

    return {
      tasks,
      total,
    }
  }

  async update(taskId: string, data: UpdateTaskData): Promise<void> {
    await this.task.update(taskId, data)
  }

  async delete(taskId: string): Promise<void> {
    await this.task.delete(taskId)
  }
}
