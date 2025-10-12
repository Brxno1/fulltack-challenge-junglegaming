import { TASK_EVENT_TYPES } from '@jungle/types'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import type { Task, UpdateTaskData } from '@/types/tasks'

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
    await this.transactionManager.runInTransaction(async (repositories) => {
      const existingTask = await repositories.tasks.findById(taskId)
      if (!existingTask) {
        throw new NotFoundException(TASK_MESSAGES.TASK_NOT_FOUND)
      }

      const validFields = this.extractValidFields(data)

      const detectedFieldChanges = this.compareFieldValues(
        existingTask,
        validFields,
      )

      if (Object.keys(validFields).length === 0) {
        throw new BadRequestException(TASK_MESSAGES.NO_CHANGES_TO_UPDATE)
      }

      await repositories.tasks.update(taskId, validFields)

      if (detectedFieldChanges) {
        const auditLogData = {
          taskId,
          userId: actor,
          action: 'FIELD_UPDATED',
          field: detectedFieldChanges.field,
          oldValue: detectedFieldChanges.oldValue,
          newValue: detectedFieldChanges.newValue,
        }

        await repositories.taskAuditLog.create(auditLogData)
      }

      await repositories.outbox.create({
        aggregateId: taskId,
        type: TASK_EVENT_TYPES.TASK_UPDATED,
        data: {
          taskId,
          actor,
          changes: validFields,
          updatedAt: new Date(),
        },
      })
    })
  }

  private extractValidFields(data: UpdateTaskData): UpdateTaskData {
    return Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    )
  }

  private compareFieldValues(
    existingTask: Task,
    validFields: UpdateTaskData,
  ): {
    field: string
    oldValue: unknown
    newValue: unknown
  } | null {
    for (const [field, newValue] of Object.entries(validFields)) {
      const oldValue = existingTask[field as keyof Task]
      if (this.hasValueChanged(oldValue, newValue)) {
        return { field, oldValue, newValue }
      }
    }

    return null
  }

  private hasValueChanged(oldValue: unknown, newValue: unknown): boolean {
    if (oldValue === newValue) return false
    if (oldValue === null && newValue === null) return false
    return true
  }
}
