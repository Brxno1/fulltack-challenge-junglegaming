import { type CreateTaskAssignmentData, TASK_EVENT_TYPES } from '@jungle/types'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { TASK_ASSIGNMENT_MESSAGES } from '@/tasks/constants/assignment.constants'
import { TASK_MESSAGES } from '@/tasks/constants/tasks.constants'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class AssignUserToTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) {}

  async execute({
    taskId,
    actor,
    assignedBy,
  }: CreateTaskAssignmentData): Promise<{ id: string }> {
    return this.transactionManager.runInTransaction(async (repositories) => {
      const existingTask = await repositories.tasks.findById(taskId)
      if (!existingTask) {
        throw new NotFoundException(TASK_MESSAGES.TASK_NOT_FOUND)
      }

      if (existingTask.actor !== assignedBy) {
        throw new ConflictException(
          TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_ASSIGN,
        )
      }

      const existingAssignment =
        await repositories.taskAssignments.findByTaskAndUser(taskId, actor)
      if (existingAssignment) {
        throw new ConflictException(
          TASK_ASSIGNMENT_MESSAGES.USER_ALREADY_ASSIGNED,
        )
      }

      const { id } = await repositories.taskAssignments.create({
        taskId,
        userId: actor,
        assignedBy,
      })

      await repositories.outbox.create({
        aggregateId: id,
        type: TASK_EVENT_TYPES.TASK_ASSIGNMENT_CREATED,
        data: {
          assignmentId: id,
          taskId,
          assignedUserId: actor,
          assignedBy,
          taskTitle: existingTask.title,
          assignedAt: new Date(),
        },
      })

      return { id }
    })
  }
}
