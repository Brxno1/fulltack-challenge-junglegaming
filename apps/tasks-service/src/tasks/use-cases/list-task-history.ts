import type {
  ListTaskAuditLogsParams,
  PaginatedTaskAuditLogs,
} from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { TaskAuditLogRepository } from '../repositories/task-audit-log.repository'

@Injectable()
export class ListTaskHistoryUseCase {
  constructor(
    private readonly taskAuditLogRepository: TaskAuditLogRepository,
  ) { }

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
