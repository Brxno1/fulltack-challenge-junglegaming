import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TaskAuditLog } from '@/tasks/entities/task-audit-log.entity'
import { TaskAuditLogRepository } from '@/tasks/repositories/task-audit-log.repository'
import type {
  CreateTaskAuditLogData,
  ListTaskAuditLogsParams,
  PaginatedTaskAuditLogs,
} from '@/types/task-audit-log'

@Injectable()
export class TypeormTaskAuditLogRepository implements TaskAuditLogRepository {
  constructor(
    @InjectRepository(TaskAuditLog)
    private readonly taskAuditLogRepository: Repository<TaskAuditLog>,
  ) {}

  async create({
    taskId,
    userId,
    field,
    oldValue,
    newValue,
    action,
  }: CreateTaskAuditLogData): Promise<{ id: string }> {
    const auditLog = this.taskAuditLogRepository.create({
      task: { id: taskId },
      taskId,
      userId: userId ?? undefined,
      field: field ?? undefined,
      oldValue,
      newValue,
      action,
    })

    const { id } = await this.taskAuditLogRepository.save(auditLog)
    return { id }
  }

  async listByTask({
    taskId,
    page,
    size,
  }: ListTaskAuditLogsParams): Promise<PaginatedTaskAuditLogs> {
    const [auditLogs, total] = await this.taskAuditLogRepository.findAndCount({
      where: { taskId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * size,
      take: size,
    })

    return {
      auditLogs: auditLogs.map((log) => ({
        id: log.id,
        taskId: log.taskId,
        userId: log.userId,
        action: log.action,
        field: log.field,
        oldValue: log.oldValue,
        newValue: log.newValue,
        createdAt: log.createdAt,
      })),
      total,
    }
  }
}
