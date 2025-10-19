import type {
  CreateTaskAssignmentData,
  ListTaskAssignmentsParams,
  PaginatedTaskAssignments,
  TaskAssignment,
} from '@jungle/types'

export abstract class TaskAssignmentsRepository {
  abstract create(data: CreateTaskAssignmentData): Promise<{ id: string }>
  abstract findByTaskAndUser(
    taskId: string,
    userId: string,
  ): Promise<TaskAssignment | null>

  abstract listByTask(
    params: ListTaskAssignmentsParams,
  ): Promise<PaginatedTaskAssignments>

  abstract delete(taskId: string, userId: string): Promise<void>
}
