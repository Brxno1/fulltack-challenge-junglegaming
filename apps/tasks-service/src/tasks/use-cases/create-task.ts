import { type CreateTaskData, TASK_EVENT_TYPES } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) { }

  async execute(input: CreateTaskData) {
    const { author, title, description, deadline, priority, status } = input

    return this.transactionManager.runInTransaction(
      async ({ tasks, outbox }) => {
        const { id } = await tasks.create({
          author,
          title,
          description,
          deadline,
          priority,
          status,
        })

        await outbox.create({
          aggregateId: id,
          type: TASK_EVENT_TYPES.TASK_CREATED,
          data: {
            taskId: id,
            author,
            title,
            priority,
            status,
            createdAt: new Date(),
          },
        })

        return { id }
      },
    )
  }
}
