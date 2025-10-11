import { Injectable } from '@nestjs/common'

import { TASK_EVENT_TYPES } from '@/types/task-events'
import { type UpdateTaskData } from '@/types/tasks'

import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) { }

  async execute(
    taskId: string,
    actor: string,
    data: UpdateTaskData,
  ): Promise<void> {
    const { title, description, deadline, priority, status } = data

    return this.transactionManager.runInTransaction(async (repositories) => {
      await repositories.tasks.update(taskId, {
        title,
        description,
        deadline,
        priority,
        status,
      })

      await repositories.outbox.create({
        aggregateId: taskId,
        type: TASK_EVENT_TYPES.TASK_UPDATED,
        data: {
          taskId,
          actor,
          changes: {
            title,
            description,
            deadline,
            priority,
            status,
          },
          updatedAt: new Date(),
        },
      })
    })
  }
}
