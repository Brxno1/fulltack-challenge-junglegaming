import { TASK_EVENT_TYPES } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) {}

  async execute(taskId: string, actor: string): Promise<void> {
    await this.transactionManager.runInTransaction(async (repositories) => {
      await repositories.tasks.delete(taskId)

      await repositories.outbox.create({
        aggregateId: taskId,
        type: TASK_EVENT_TYPES.TASK_DELETED,
        data: {
          taskId,
          actor,
          deletedAt: new Date(),
        },
      })
    })
  }
}
