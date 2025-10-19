import { TASK_EVENT_TYPES } from '@jungle/types'
import { Injectable, NotFoundException } from '@nestjs/common'

import { TASK_MESSAGES } from '@/tasks/constants/tasks.constants'
import { type CreateTaskCommentData } from '@/types/task-comments'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class CreateTaskCommentUseCase {
  constructor(private readonly transactionManager: TransactionManager) {}

  async execute({
    taskId,
    actor,
    content,
  }: CreateTaskCommentData): Promise<{ id: string }> {
    return this.transactionManager.runInTransaction(async (repositories) => {
      const task = await repositories.tasks.findById(taskId)
      if (!task) {
        throw new NotFoundException(TASK_MESSAGES.TASK_NOT_FOUND)
      }

      const { id } = await repositories.taskComments.create({
        taskId,
        actor,
        content,
      })

      await repositories.outbox.create({
        aggregateId: id,
        type: TASK_EVENT_TYPES.TASK_COMMENT_CREATED,
        data: {
          commentId: id,
          taskId,
          userId: actor,
          content,
          createdAt: new Date(),
        },
      })

      return { id }
    })
  }
}
