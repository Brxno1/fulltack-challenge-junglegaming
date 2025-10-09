import { Injectable, NotFoundException } from '@nestjs/common'

import type { ListTaskCommentsParams, PaginatedTaskComments } from '@/types'

import { TASK_COMMENT_MESSAGES } from '../constants/task-comment.constants'
import { TaskCommentsRepository } from '../repositories/task-comments.repository'
import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class ListTaskCommentsUseCase {
  constructor(
    private readonly taskCommentsRepository: TaskCommentsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(
    params: ListTaskCommentsParams,
  ): Promise<PaginatedTaskComments> {
    const { taskId, page, size } = params

    const task = await this.tasksRepository.findById(taskId)
    if (!task) {
      throw new NotFoundException(TASK_COMMENT_MESSAGES.TASK_NOT_FOUND)
    }

    return this.taskCommentsRepository.listByTask({
      taskId,
      page,
      size,
    })
  }
}
