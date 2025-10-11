import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { TASK_ASSIGNMENT_MESSAGES } from '@/tasks/constants/assignment.constants'
import { TASK_EVENT_TYPES } from '@jungle/types'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class RemoveUserFromTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) { }

  async execute(
    taskId: string,
    userId: string,
    removedBy: string,
  ): Promise<void> {
    return this.transactionManager.runInTransaction(async (repositories) => {
      const existingTask = await repositories.tasks.findById(taskId)

      if (!existingTask) {
        throw new NotFoundException(TASK_ASSIGNMENT_MESSAGES.TASK_NOT_FOUND)
      }

      if (existingTask.createdBy !== removedBy) {
        throw new ConflictException(
          TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_REMOVE,
        )
      }

      const assignment = await repositories.taskAssignments.findByTaskAndUser(
        taskId,
        userId,
      )
      if (!assignment) {
        throw new NotFoundException(
          TASK_ASSIGNMENT_MESSAGES.USER_ASSIGNMENT_NOT_FOUND,
        )
      }

      await repositories.taskAssignments.delete(taskId, userId)

      await repositories.outbox.create({
        aggregateId: assignment.id,
        type: TASK_EVENT_TYPES.TASK_ASSIGNMENT_REMOVED,
        data: {
          assignmentId: assignment.id,
          taskId,
          removedUserId: userId,
          removedBy,
          taskTitle: existingTask.title,
          removedAt: new Date(),
        },
      })
    })
  }
}
