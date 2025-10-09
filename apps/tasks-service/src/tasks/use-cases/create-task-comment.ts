import { Injectable, NotFoundException } from '@nestjs/common'

import { TASK_COMMENT_MESSAGES } from '@/tasks/constants/task-comment.constants'
import type { CreateTaskCommentData } from '@/types'

import { TaskCommentsRepository } from '../repositories/task-comments.repository'
import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class CreateTaskCommentUseCase {
  constructor(
    private readonly taskCommentsRepository: TaskCommentsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(input: CreateTaskCommentData): Promise<{ id: string }> {
    const { taskId, userId, content } = input

    const task = await this.tasksRepository.findById(taskId)
    if (!task) {
      throw new NotFoundException(TASK_COMMENT_MESSAGES.TASK_NOT_FOUND)
    }

    const { id } = await this.taskCommentsRepository.create({
      taskId,
      userId,
      content,
    })

    return { id }
  }
}
