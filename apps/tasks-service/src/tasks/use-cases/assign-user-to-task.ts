import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { TASK_ASSIGNMENT_MESSAGES } from '@/tasks/constants/assignment.constants'
import { type CreateTaskAssignmentData } from '@/types/task-assignments'
import { TASK_EVENT_TYPES } from '@/types/task-events'

import { TaskAssignmentsRepository } from '../repositories/task-assignments.repository'
import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class AssignUserToTaskUseCase {
  constructor(
    private readonly taskAssignmentsRepository: TaskAssignmentsRepository,
    private readonly transactionManager: TransactionManager,
  ) { }

  async execute(data: CreateTaskAssignmentData): Promise<{ id: string }> {
    const { taskId, userId, assignedBy } = data

    return this.transactionManager.runInTransaction(async (repositories) => {
      const existingTask = await repositories.tasks.findById(taskId)
      if (!existingTask) {
        throw new NotFoundException(TASK_ASSIGNMENT_MESSAGES.TASK_NOT_FOUND)
      }

      if (existingTask.createdBy !== assignedBy) {
        throw new ConflictException(
          TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_ASSIGN,
        )
      }

      const existingAssignment =
        await repositories.taskAssignments.findByTaskAndUser(taskId, userId)
      if (existingAssignment) {
        throw new ConflictException(
          TASK_ASSIGNMENT_MESSAGES.USER_ALREADY_ASSIGNED,
        )
      }

      const { id } = await repositories.taskAssignments.create({
        taskId,
        userId,
        assignedBy,
      })

      await repositories.outbox.create({
        aggregateId: id,
        type: TASK_EVENT_TYPES.TASK_ASSIGNMENT_CREATED,
        data: {
          assignmentId: id,
          taskId,
          assignedUserId: userId,
          assignedBy,
          taskTitle: existingTask.title,
          assignedAt: new Date(),
        },
      })

      return { id }
    })
  }
}
