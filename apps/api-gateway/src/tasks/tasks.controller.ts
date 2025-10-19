import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'

import { User } from '@/auth/decorators/user.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth-guard'
import { TasksServiceContract } from '@/contracts/tasks.service.contract'
import {
  CreateTaskDto,
  ListTasksQueryDto,
  UpdateTaskDto,
} from '@/dtos/tasks.dto'

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksServiceContract) {}

  @Get()
  async list(@Query() query: ListTasksQueryDto) {
    return this.tasksService.list({
      page: query.page ?? 1,
      size: query.size ?? 100,
    })
  }

  @Get(':taskId')
  async findById(@Param('taskId') taskId: string) {
    return this.tasksService.findById(taskId)
  }

  @Post()
  async create(
    @User() user: { email: string; userId: string },
    @Body() body: CreateTaskDto,
  ) {
    const { title, description, deadline, priority, status } = body
    return this.tasksService.create({
      actor: user.userId,
      title,
      description,
      deadline,
      priority,
      status,
    })
  }

  @Patch(':taskId')
  async update(
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskDto,
    @User() user: { email: string; userId: string },
  ) {
    const { title, description, deadline, priority, status } = body

    await this.tasksService.update(taskId, {
      actor: user.userId,
      title,
      description,
      deadline,
      priority,
      status,
    })
  }
}
