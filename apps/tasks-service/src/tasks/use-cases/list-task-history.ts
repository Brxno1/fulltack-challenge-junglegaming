import { Injectable, NotFoundException } from '@nestjs/common'

import { TASK_MESSAGES } from '@/tasks/constants/tasks.constants'
import type {
  ListTaskAuditLogsParams,
  PaginatedTaskAuditLogs,
} from '@/types/task-audit-log'

import { TaskAuditLogRepository } from '../repositories/task-audit-log.repository'
import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class ListTaskHistoryUseCase {
  constructor(
    private readonly taskAuditLogRepository: TaskAuditLogRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute({
    taskId,
    page,
    size,
  }: ListTaskAuditLogsParams): Promise<PaginatedTaskAuditLogs> {
    const task = await this.tasksRepository.findById(taskId)
    if (!task) {
      throw new NotFoundException(TASK_MESSAGES.TASK_NOT_FOUND)
    }

    return this.taskAuditLogRepository.listByTask({
      taskId,
      page,
      size,
    })
  }
}
