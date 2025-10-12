import type {
  CreateTaskAuditLogData,
  ListTaskAuditLogsParams,
  PaginatedTaskAuditLogs,
} from '@/types/task-audit-log'

export abstract class TaskAuditLogServiceContract {
  abstract create(data: CreateTaskAuditLogData): Promise<{ id: string }>
  abstract listByTask(
    params: ListTaskAuditLogsParams,
  ): Promise<PaginatedTaskAuditLogs>
}
