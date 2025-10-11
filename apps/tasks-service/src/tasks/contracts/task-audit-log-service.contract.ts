import type { PaginatedTaskAuditLogs } from '@/types/task-audit-log'
import type {
  CreateTaskAuditLogData,
  ListTaskAuditLogsParams,
} from '@/types/task-audit-log'

export abstract class TaskAuditLogServiceContract {
  abstract create(data: CreateTaskAuditLogData): Promise<{ id: string }>
  abstract listByTask(
    params: ListTaskAuditLogsParams,
  ): Promise<PaginatedTaskAuditLogs>
}
