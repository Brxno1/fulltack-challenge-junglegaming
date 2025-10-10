import { Injectable, NotFoundException } from '@nestjs/common'

import { TASK_COMMENT_MESSAGES } from '@/tasks/constants/task-comment.constants'
import type { CreateTaskCommentData } from '@/types'

import { TaskCommentEventsContract } from '../events/contracts/task-comment-events.contract'
import { TaskCommentsRepository } from '../repositories/task-comments.repository'
import { TasksRepository } from '../repositories/tasks.repository'

@Injectable()
export class CreateTaskCommentUseCase {
  constructor(
    private readonly taskCommentsRepository: TaskCommentsRepository,
    private readonly tasksRepository: TasksRepository,
    private readonly eventPublisher: TaskCommentEventsContract,
  ) { }

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

    await this.eventPublisher.publishTaskCommentCreated({
      type: 'task.comment.created',
      commentId: id,
      taskId,
      userId,
      content,
      createdAt: new Date(),
    })

    return { id }
  }
}
