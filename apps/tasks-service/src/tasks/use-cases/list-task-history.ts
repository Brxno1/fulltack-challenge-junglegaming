import { Injectable } from '@nestjs/common'

import type {
  ListTaskAuditLogsParams,
  PaginatedTaskAuditLogs,
} from '@/types/task-audit-log'

import { TaskAuditLogRepository } from '../repositories/task-audit-log.repository'

@Injectable()
export class ListTaskHistoryUseCase {
  constructor(
    private readonly taskAuditLogRepository: TaskAuditLogRepository,
  ) {}

  async execute({
    taskId,
    page,
    size,
  }: ListTaskAuditLogsParams): Promise<PaginatedTaskAuditLogs> {
    return this.taskAuditLogRepository.listByTask({
      taskId,
      page,
      size,
    })
  }
}
