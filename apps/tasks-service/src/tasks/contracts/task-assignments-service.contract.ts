import {
  CreateTaskAssignmentData,
  ListTaskAssignmentsParams,
  PaginatedTaskAssignments,
} from '@/types/task-assignments'

export abstract class TaskAssignmentsServiceContract {
  abstract assignUser(data: CreateTaskAssignmentData): Promise<{ id: string }>

  abstract removeUser(
    taskId: string,
    userId: string,
    removedBy: string,
  ): Promise<void>

  abstract listByTask(
    params: ListTaskAssignmentsParams,
  ): Promise<PaginatedTaskAssignments>
}
