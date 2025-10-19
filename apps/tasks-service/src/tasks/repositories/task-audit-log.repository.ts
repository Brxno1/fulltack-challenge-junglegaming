import type { PaginatedTaskAuditLogs } from '@jungle/types'

import type {
  CreateTaskAuditLogData,
  ListTaskAuditLogsParams,
} from '@/types/task-audit-log'

export abstract class TaskAuditLogRepository {
  abstract create(data: CreateTaskAuditLogData): Promise<{ id: string }>
  abstract listByTask(
    params: ListTaskAuditLogsParams,
  ): Promise<PaginatedTaskAuditLogs>
}
