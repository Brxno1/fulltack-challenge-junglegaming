import { Injectable } from '@nestjs/common'

import type {
  CreateTaskCommentData,
  ListTaskCommentsParams,
  PaginatedTaskComments,
} from '@/types'

import { TasksCommentsContract } from '../contracts/comments-service.contract'
import { CreateTaskCommentUseCase } from '../use-cases/create-task-comment'
import { ListTaskCommentsUseCase } from '../use-cases/list-task-comments'

@Injectable()
export class TasksComments implements TasksCommentsContract {
  constructor(
    private readonly createTaskCommentUseCase: CreateTaskCommentUseCase,
    private readonly listTaskCommentsUseCase: ListTaskCommentsUseCase,
  ) {}

  async create(data: CreateTaskCommentData): Promise<{ id: string }> {
    const { taskId, userId, content } = data

    const { id } = await this.createTaskCommentUseCase.execute({
      taskId,
      userId,
      content,
    })

    return { id }
  }

  async listByTask(
    params: ListTaskCommentsParams,
  ): Promise<PaginatedTaskComments> {
    const { taskId, page, size } = params

    return this.listTaskCommentsUseCase.execute({
      taskId,
      page,
      size,
    })
  }
}
