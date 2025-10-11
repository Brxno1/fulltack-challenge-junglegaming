import { Injectable } from '@nestjs/common'

import type {
  CreateTaskAuditLogData,
  ListTaskAuditLogsParams,
  PaginatedTaskAuditLogs,
} from '@/types/task-audit-log'

import { TaskAuditLogServiceContract } from '../contracts/task-audit-log-service.contract'
import { CreateTaskAuditLogUseCase } from '../use-cases/create-task-audit-log'
import { ListTaskHistoryUseCase } from '../use-cases/list-task-history'

@Injectable()
export class TaskAuditLogService implements TaskAuditLogServiceContract {
  constructor(
    private readonly createTaskAuditLogUseCase: CreateTaskAuditLogUseCase,
    private readonly listTaskHistoryUseCase: ListTaskHistoryUseCase,
  ) {}

  async create(data: CreateTaskAuditLogData): Promise<{ id: string }> {
    return this.createTaskAuditLogUseCase.execute(data)
  }

  async listByTask(
    params: ListTaskAuditLogsParams,
  ): Promise<PaginatedTaskAuditLogs> {
    return this.listTaskHistoryUseCase.execute(params)
  }
}
