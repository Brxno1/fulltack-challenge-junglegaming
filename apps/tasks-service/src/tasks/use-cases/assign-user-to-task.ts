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
  constructor(private readonly transactionManager: TransactionManager) { }

  async execute({
    taskId,
    author,
    assignedBy,
  }: CreateTaskAssignmentData): Promise<{ id: string }> {
    return this.transactionManager.runInTransaction(async (repositories) => {
      const existingTask = await repositories.tasks.findById(taskId)
      if (!existingTask) {
        throw new NotFoundException(TASK_MESSAGES.TASK_NOT_FOUND)
      }

      if (existingTask.author !== assignedBy) {
        throw new ConflictException(
          TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_ASSIGN,
        )
      }

      const existingAssignment =
        await repositories.taskAssignments.findByTaskAndUser(taskId, author)
      if (existingAssignment) {
        throw new ConflictException(
          TASK_ASSIGNMENT_MESSAGES.USER_ALREADY_ASSIGNED,
        )
      }

      const { id } = await repositories.taskAssignments.create({
        taskId,
        userId: author,
        assignedBy,
      })

      await repositories.outbox.create({
        aggregateId: id,
        type: TASK_EVENT_TYPES.TASK_ASSIGNMENT_CREATED,
        data: {
          assignmentId: id,
          taskId,
          assignedUserId: author,
          assignedBy,
          taskTitle: existingTask.title,
          assignedAt: new Date(),
        },
      })

      return { id }
    })
  }
}
