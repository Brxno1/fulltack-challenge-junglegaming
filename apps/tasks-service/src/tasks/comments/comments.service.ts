import type { PaginatedTaskComments } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import type {
  CreateTaskCommentData,
  ListTaskCommentsParams,
} from '@/types/task-comments'

import { TasksCommentsContract } from '../contracts/tasks-comments-service.contract'
import { CreateTaskCommentUseCase } from '../use-cases/create-task-comment'
import { ListTaskCommentsUseCase } from '../use-cases/list-task-comments'

@Injectable()
export class TasksCommentsService implements TasksCommentsContract {
  constructor(
    private readonly createTaskCommentUseCase: CreateTaskCommentUseCase,
    private readonly listTaskCommentsUseCase: ListTaskCommentsUseCase,
  ) {}

  async create(data: CreateTaskCommentData): Promise<{ id: string }> {
    const { taskId, author, content } = data

    console.log('🔍 Comments Service - author:', author)

    const { id } = await this.createTaskCommentUseCase.execute({
      taskId,
      author,
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
