import { Injectable, NotFoundException } from '@nestjs/common'

import { TASK_COMMENT_MESSAGES } from '@/tasks/constants/task-comment.constants'
import { type CreateTaskCommentData } from '@/types/task-comments'
import { TASK_EVENT_TYPES } from '@jungle/types'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class CreateTaskCommentUseCase {
  constructor(private readonly transactionManager: TransactionManager) { }

  async execute(input: CreateTaskCommentData): Promise<{ id: string }> {
    const { taskId, userId, content } = input

    return this.transactionManager.runInTransaction(async (repositories) => {
      const task = await repositories.tasks.findById(taskId)
      if (!task) {
        throw new NotFoundException(TASK_COMMENT_MESSAGES.TASK_NOT_FOUND)
      }

      const { id } = await repositories.taskComments.create({
        taskId,
        userId,
        content,
      })

      await repositories.outbox.create({
        aggregateId: id,
        type: TASK_EVENT_TYPES.TASK_COMMENT_CREATED,
        data: {
          commentId: id,
          taskId,
          userId,
          content,
          createdAt: new Date(),
        },
      })

      return { id }
    })
  }
}
