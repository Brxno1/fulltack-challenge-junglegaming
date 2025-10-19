import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'

import { User } from '@/auth/decorators/user.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth-guard'
import { TaskCommentsServiceContract } from '@/contracts/task-comments.service.contract'
import {
  CreateTaskCommentDto,
  CreateTaskCommentResponseDto,
  ListTaskCommentsQueryDto,
  PaginatedTaskCommentsResponseDto,
  TaskIdParamDto,
} from '@/dtos/task-comments.dto'

import { TaskCommentsSwaggerConfig } from './task-comments.swagger.config'

@Controller('api/tasks/:taskId/comments')
@UseGuards(JwtAuthGuard)
@TaskCommentsSwaggerConfig.controller()
export class TaskCommentsController {
  constructor(
    private readonly taskCommentsService: TaskCommentsServiceContract,
  ) {}

  @Post()
  @TaskCommentsSwaggerConfig.create()
  async create(
    @Param() params: TaskIdParamDto,
    @User() user: { email: string; userId: string },
    @Body() body: CreateTaskCommentDto,
  ): Promise<CreateTaskCommentResponseDto> {
    const { content } = body

    console.log({ content })

    const { id } = await this.taskCommentsService.create({
      taskId: params.taskId,
      actor: user.userId,
      content,
    })

    return { id }
  }

  @Get()
  @TaskCommentsSwaggerConfig.list()
  async list(
    @Param() params: TaskIdParamDto,
    @Query() query: ListTaskCommentsQueryDto,
  ): Promise<PaginatedTaskCommentsResponseDto> {
    const { comments, total } = await this.taskCommentsService.listByTask({
      taskId: params.taskId,
      page: query.page ?? 1,
      size: query.size ?? 100,
    })

    return { comments, total }
  }
}
