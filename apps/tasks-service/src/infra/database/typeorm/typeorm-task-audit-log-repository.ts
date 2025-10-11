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
    const query = this.taskAuditLogRepository
      .createQueryBuilder('log')
      .leftJoin('log.task', 'task')
      .select([
        'log.id',
        'log.userId',
        'log.action',
        'log.field',
        'log.oldValue',
        'log.newValue',
        'log.createdAt',
        'task.id as taskId',
      ])
      .where('task.id = :taskId', { taskId })
      .orderBy('log.createdAt', 'DESC')
      .skip((page - 1) * size)
      .take(size)

    const [auditLogs, total] = await query.getManyAndCount()

    return {
      auditLogs: auditLogs.map((log) => ({
        id: log.id,
        taskId,
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
