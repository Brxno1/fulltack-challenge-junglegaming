import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common'

import {
  CreateTaskCommentDto,
  ListTaskCommentsQueryDto,
  TaskIdParamDto,
} from '@/tasks/dtos/task-comment.dtos'

import { TasksCommentsContract } from '../contracts/tasks-comments-service.contract'

@Controller('/tasks/:taskId/comments')
export class TasksCommentsController {
  constructor(private readonly TasksComments: TasksCommentsContract) {}

  @Post()
  async create(
    @Param() params: TaskIdParamDto,
    @Headers('x-authenticated-user') userInfo: string,
    @Body() body: CreateTaskCommentDto,
  ): Promise<{ id: string }> {
    const { content } = body
    const user = JSON.parse(userInfo)

    const { id } = await this.TasksComments.create({
      taskId: params.taskId,
      author: user.id,
      authorName: user.username,
      content,
    })

    return { id }
  }

  @Get()
  async list(
    @Param() params: TaskIdParamDto,
    @Query() query: ListTaskCommentsQueryDto,
  ) {
    const { comments, total } = await this.TasksComments.listByTask({
      taskId: params.taskId,
      page: query.page ?? 1,
      size: query.size ?? 10,
    })

    return { comments, total }
  }
}
