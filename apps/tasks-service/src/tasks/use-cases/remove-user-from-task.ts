import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { TASK_ASSIGNMENT_MESSAGES } from '@/tasks/constants/assignment.constants'
import { TasksRepository } from '@/tasks/repositories/tasks.repository'

import { TaskAssignmentsRepository } from '../repositories/task-assignments.repository'

@Injectable()
export class RemoveUserFromTaskUseCase {
  constructor(
    private readonly taskAssignmentsRepository: TaskAssignmentsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(
    taskId: string,
    userId: string,
    removedBy: string,
  ): Promise<void> {
    const existingTask = await this.tasksRepository.findById(taskId)

    if (!existingTask) {
      throw new NotFoundException(TASK_ASSIGNMENT_MESSAGES.TASK_NOT_FOUND)
    }

    if (existingTask.createdBy !== removedBy) {
      throw new ConflictException(
        TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_REMOVE,
      )
    }

    const assignment = await this.taskAssignmentsRepository.findByTaskAndUser(
      taskId,
      userId,
    )
    if (!assignment) {
      throw new NotFoundException(
        TASK_ASSIGNMENT_MESSAGES.USER_ASSIGNMENT_NOT_FOUND,
      )
    }

    await this.taskAssignmentsRepository.delete(taskId, userId)
  }
}
