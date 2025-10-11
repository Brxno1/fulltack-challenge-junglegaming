import { TASK_EVENT_TYPES } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { type UpdateTaskData } from '@/types/tasks'

import { TASK_MESSAGES } from '../constants/tasks.constants'
import { TransactionManager } from '../repositories/transaction-manager.repository'

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly transactionManager: TransactionManager) {}

  async execute(
    taskId: string,
    actor: string,
    data: UpdateTaskData,
  ): Promise<void> {
    const { title, description, deadline, priority, status } = data

    return this.transactionManager.runInTransaction(async (repositories) => {
      const existingTask = await repositories.tasks.findById(taskId)
      if (!existingTask) {
        throw new Error(TASK_MESSAGES.TASK_NOT_FOUND)
      }

      await repositories.tasks.update(taskId, {
        title,
        description,
        deadline,
        priority,
        status,
      })

      const hasChanged = (oldValue: unknown, newValue: unknown): boolean => {
        if (oldValue === newValue) return false
        if (oldValue === null && newValue === null) return false
        return true
      }

      const fieldsToCheck = [
        { field: 'title', oldValue: existingTask.title, newValue: title },
        {
          field: 'description',
          oldValue: existingTask.description,
          newValue: description,
        },
        {
          field: 'deadline',
          oldValue: existingTask.deadline,
          newValue: deadline,
        },
        {
          field: 'priority',
          oldValue: existingTask.priority,
          newValue: priority,
        },
        { field: 'status', oldValue: existingTask.status, newValue: status },
      ]

      for (const { field, oldValue, newValue } of fieldsToCheck) {
        if (newValue !== undefined && hasChanged(oldValue, newValue)) {
          await repositories.taskAuditLog.create({
            taskId,
            userId: actor,
            action: 'FIELD_UPDATED',
            field,
            oldValue,
            newValue,
          })
        }
      }

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
