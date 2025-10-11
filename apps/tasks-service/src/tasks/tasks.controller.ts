import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { TasksServiceContract } from './contracts/tasks-service.contract'
import {
  CreateTaskDto,
  ListTasksQueryDto,
  UpdateTaskDto,
} from './dtos/tasks.dtos'

@Controller('/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksServiceContract) {}

  @Get()
  async list(@Query() query: ListTasksQueryDto) {
    return this.taskService.list({
      page: query.page ?? 1,
      size: query.size ?? 10,
    })
  }

  @Get(':taskId')
  async findById(@Param('taskId') taskId: string) {
    return this.taskService.findById(taskId)
  }

  @Post()
  async create(
    @Headers('x-authenticated-user-id') userId: string,
    @Body() body: CreateTaskDto,
  ): Promise<{ id: string }> {
    const { title, description, deadline, priority, status } = body

    const { id } = await this.taskService.create({
      createdBy: userId,
      title,
      description,
      deadline,
      priority,
      status,
    })

    return { id }
  }

  @Patch(':taskId')
  async update(
    @Headers('x-authenticated-user-id') updatedBy: string,
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskDto,
  ) {
    const { title, description, deadline, priority, status } = body

    await this.taskService.update(taskId, updatedBy, {
      title,
      description,
      deadline,
      priority,
      status,
    })
  }

  @Delete(':taskId')
  async delete(
    @Param('taskId') taskId: string,
    @Headers('x-authenticated-user-id') actor: string,
  ) {
    await this.taskService.delete(taskId, actor)
  }
}
