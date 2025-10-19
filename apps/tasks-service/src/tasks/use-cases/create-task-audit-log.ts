import type { CreateTaskAuditLogData } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { TaskAuditLogRepository } from '../repositories/task-audit-log.repository'

@Injectable()
export class CreateTaskAuditLogUseCase {
  constructor(
    private readonly taskAuditLogRepository: TaskAuditLogRepository,
  ) {}

  async execute({
    taskId,
    actor,
    field,
    oldValue,
    newValue,
    action,
  }: CreateTaskAuditLogData): Promise<{ id: string }> {
    return this.taskAuditLogRepository.create({
      taskId,
      actor,
      field,
      oldValue,
      newValue,
      action,
    })
  }
}
