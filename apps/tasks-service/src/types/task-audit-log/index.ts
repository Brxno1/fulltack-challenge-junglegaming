export interface TaskAuditLog {
  id: string
  taskId: string
  userId: string | null
  action: string
  field: string | null
  oldValue: unknown | null
  newValue: unknown | null
  createdAt: Date
}

export interface CreateTaskAuditLogData {
  taskId: string
  userId: string | null
  action: string
  field: string | null
  oldValue: unknown | null
  newValue: unknown | null
}

export interface PaginatedTaskAuditLogs {
  auditLogs: TaskAuditLog[]
  total: number
}

export interface ListTaskAuditLogsParams {
  taskId: string
  page: number
  size: number
}
