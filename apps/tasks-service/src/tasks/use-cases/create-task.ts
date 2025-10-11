import { Injectable } from '@nestjs/common'

import { type CreateTaskData } from '@/types/tasks'
import { TASK_EVENT_TYPES } from '@/types/task-events'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) { }

  async execute(input: CreateTaskData) {
    const { createdBy, title, description, deadline, priority, status } = input

    return this.transactionManager.runInTransaction(
      async ({ tasks, outbox }) => {
        const { id } = await tasks.create({
          createdBy,
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
            actor: createdBy,
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
