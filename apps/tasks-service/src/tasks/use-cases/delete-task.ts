import { TASK_EVENT_TYPES } from '@jungle/types'
import { Injectable, NotFoundException } from '@nestjs/common'

import { TASK_MESSAGES } from '../constants/tasks.constants'
import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) { }

  async execute(taskId: string, author: string): Promise<void> {
    await this.transactionManager.runInTransaction(async (repositories) => {
      const existingTask = await repositories.tasks.findById(taskId)
      if (!existingTask) {
        throw new NotFoundException(TASK_MESSAGES.TASK_NOT_FOUND)
      }

      await repositories.taskAuditLog.create({
        taskId,
        author,
        action: 'TASK_DELETED',
        field: null,
        oldValue: {
          title: existingTask.title,
          description: existingTask.description,
          deadline: existingTask.deadline,
          priority: existingTask.priority,
          status: existingTask.status,
          author: existingTask.author,
          createdAt: existingTask.createdAt,
          updatedAt: existingTask.updatedAt,
        },
        newValue: null,
      })

      await repositories.tasks.softDelete(taskId)

      await repositories.outbox.create({
        aggregateId: taskId,
        type: TASK_EVENT_TYPES.TASK_DELETED,
        data: {
          taskId,
          author,
          deletedAt: new Date(),
        },
      })
    })
  }
}
