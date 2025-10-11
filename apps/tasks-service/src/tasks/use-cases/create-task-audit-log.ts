import { Injectable } from '@nestjs/common'

import type { CreateTaskAuditLogData } from '@/types/task-audit-log'

import { TaskAuditLogRepository } from '../repositories/task-audit-log.repository'

@Injectable()
export class CreateTaskAuditLogUseCase {
  constructor(
    private readonly taskAuditLogRepository: TaskAuditLogRepository,
  ) {}

  async execute(data: CreateTaskAuditLogData): Promise<{ id: string }> {
    return this.taskAuditLogRepository.create(data)
  }
}
