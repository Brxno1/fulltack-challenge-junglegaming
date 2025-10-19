import type {
  CreateTaskAssignmentData,
  ListTaskAssignmentsParams,
  PaginatedTaskAssignments,
} from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { TaskAssignmentsServiceContract } from '../contracts/task-assignments-service.contract'
import { AssignUserToTaskUseCase } from '../use-cases/assign-user-to-task'
import { ListTaskAssignmentsUseCase } from '../use-cases/list-task-assignments'
import { RemoveUserFromTaskUseCase } from '../use-cases/remove-user-from-task'

@Injectable()
export class TaskAssignmentsService implements TaskAssignmentsServiceContract {
  constructor(
    private readonly assignUserToTaskUseCase: AssignUserToTaskUseCase,
    private readonly removeUserFromTaskUseCase: RemoveUserFromTaskUseCase,
    private readonly listTaskAssignmentsUseCase: ListTaskAssignmentsUseCase,
  ) {}

  async assignUser(data: CreateTaskAssignmentData): Promise<{ id: string }> {
    return this.assignUserToTaskUseCase.execute(data)
  }

  async removeUser(
    taskId: string,
    actor: string,
    removedBy: string,
  ): Promise<void> {
    return this.removeUserFromTaskUseCase.execute(taskId, actor, removedBy)
  }

  async listByTask(
    params: ListTaskAssignmentsParams,
  ): Promise<PaginatedTaskAssignments> {
    return this.listTaskAssignmentsUseCase.execute(params)
  }
}
