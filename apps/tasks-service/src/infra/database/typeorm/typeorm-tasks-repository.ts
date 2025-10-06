import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Task } from '@/tasks/entities/tasks.entity'
import {
  TasksRepository,
  UpdateTaskData,
} from '@/tasks/repositories/tasks.repository'
import type { CreateTaskData, ListTasksParams, PaginatedResult } from '@/types'

@Injectable()
export class TypeormTasksRepository implements TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly task: Repository<Task>,
  ) { }

  findById(id: string): Promise<Task | null> {
    return this.task.findOne({ where: { id } })
  }

  async create(data: CreateTaskData): Promise<{ id: string }> {
    const created = await this.task.save(data)
    return { id: created.id }
  }

  async list(params: ListTasksParams): Promise<PaginatedResult> {
    const { page, size } = params
    const query = this.task.createQueryBuilder('task')

    const [tasks, total] = await query
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount()

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
