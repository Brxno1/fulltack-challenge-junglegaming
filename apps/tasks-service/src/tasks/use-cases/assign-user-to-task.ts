import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { TASK_ASSIGNMENT_MESSAGES } from '@/tasks/constants/assignment.constants'
import { TasksRepository } from '@/tasks/repositories/tasks.repository'
import { type CreateTaskAssignmentData } from '@/types'

import { TaskAssignmentsRepository } from '../repositories/task-assignments.repository'

@Injectable()
export class AssignUserToTaskUseCase {
  constructor(
    private readonly taskAssignmentsRepository: TaskAssignmentsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(data: CreateTaskAssignmentData): Promise<{ id: string }> {
    const { taskId, userId, assignedBy } = data

    const existingTask = await this.tasksRepository.findById(taskId)
    if (!existingTask) {
      throw new NotFoundException(TASK_ASSIGNMENT_MESSAGES.TASK_NOT_FOUND)
    }

    if (existingTask.createdBy !== assignedBy) {
      throw new ConflictException(
        TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_ASSIGN,
      )
    }

    const existingAssignment =
      await this.taskAssignmentsRepository.findByTaskAndUser(taskId, userId)
    if (existingAssignment) {
      throw new ConflictException(
        TASK_ASSIGNMENT_MESSAGES.USER_ALREADY_ASSIGNED,
      )
    }

    const { id } = await this.taskAssignmentsRepository.create({
      taskId,
      userId,
      assignedBy,
    })

    return { id }
  }
}
