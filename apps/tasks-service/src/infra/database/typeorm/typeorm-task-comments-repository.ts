import type {
  CreateTaskCommentData,
  ListTaskCommentsParams,
  PaginatedTaskComments,
} from '@jungle/types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TaskComment } from '@/tasks/entities/task-comment.entity'
import { TaskCommentsRepository } from '@/tasks/repositories/task-comments.repository'

@Injectable()
export class TypeormTaskCommentsRepository implements TaskCommentsRepository {
  constructor(
    @InjectRepository(TaskComment)
    private readonly taskCommentRepository: Repository<TaskComment>,
  ) {}

  async create(data: CreateTaskCommentData): Promise<{ id: string }> {
    const { id } = await this.taskCommentRepository.save(data)
    return { id }
  }

  async listByTask(
    params: ListTaskCommentsParams,
  ): Promise<PaginatedTaskComments> {
    const { taskId, page, size } = params

    const [comments, total] = await this.taskCommentRepository.findAndCount({
      where: { taskId },
      order: {
        createdAt: 'ASC',
      },
      skip: (page - 1) * size,
      take: size,
    })

    return {
      comments,
      total,
    }
  }
}
