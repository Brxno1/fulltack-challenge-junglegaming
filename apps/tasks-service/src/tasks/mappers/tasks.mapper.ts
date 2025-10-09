import type { CreateTaskData, UpdateTaskData } from '@/types'

import { CreateTaskDto, UpdateTaskDto } from '../dtos/tasks.dtos'

export class TasksMapper {
  static toCreateTaskData(dto: CreateTaskDto): CreateTaskData {
    return {
      title: dto.title,
      description: dto.description ?? null,
      deadline: dto.deadline,
      priority: dto.priority,
      status: dto.status,
    }
  }

  static toUpdateTaskData(dto: UpdateTaskDto): UpdateTaskData {
    return {
      title: dto.title,
      description: dto.description ?? null,
      deadline: dto.deadline,
      priority: dto.priority,
      status: dto.status,
    }
  }
}
