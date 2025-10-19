import type {
  CreateTaskAuditLogData,
  ListTaskAuditLogsParams,
  PaginatedTaskAuditLogs,
} from '@jungle/types'

export abstract class TaskAuditLogRepository {
  abstract create(data: CreateTaskAuditLogData): Promise<{ id: string }>
  abstract listByTask(
    params: ListTaskAuditLogsParams,
  ): Promise<PaginatedTaskAuditLogs>
}
