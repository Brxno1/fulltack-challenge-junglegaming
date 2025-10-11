export interface CreateTaskAssignmentData {
  taskId: string
  userId: string
  assignedBy: string
}

export interface TaskAssignment {
  id: string
  taskId: string
  userId: string
  createdAt: Date
}

export interface PaginatedTaskAssignments {
  assignments: TaskAssignment[]
  total: number
}

export interface ListTaskAssignmentsParams {
  taskId: string
  page: number
  size: number
}
