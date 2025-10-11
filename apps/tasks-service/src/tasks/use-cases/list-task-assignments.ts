import { Injectable, NotFoundException } from '@nestjs/common'

import { TASK_ASSIGNMENT_MESSAGES } from '@/tasks/constants/assignment.constants'
import { TasksRepository } from '@/tasks/repositories/tasks.repository'
import type {
  ListTaskAssignmentsParams,
  PaginatedTaskAssignments,
} from '@/types/task-assignments'

import { TaskAssignmentsRepository } from '../repositories/task-assignments.repository'

@Injectable()
export class ListTaskAssignmentsUseCase {
  constructor(
    private readonly taskAssignmentsRepository: TaskAssignmentsRepository,
    private readonly tasksRepository: TasksRepository,
  ) { }

  async execute({
    taskId,
    page,
    size,
  }: ListTaskAssignmentsParams): Promise<PaginatedTaskAssignments> {
    const task = await this.tasksRepository.findById(taskId)
    if (!task) {
      throw new NotFoundException(TASK_ASSIGNMENT_MESSAGES.TASK_NOT_FOUND)
    }

    return this.taskAssignmentsRepository.listByTask({
      taskId,
      page,
      size,
    })
  }
}
