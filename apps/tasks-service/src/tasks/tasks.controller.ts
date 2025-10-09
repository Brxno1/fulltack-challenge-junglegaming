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

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskService.findById(id)
  }

  @Post()
  async create(
    @Headers('x-user-id') userId: string,
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const { title, description, deadline, priority, status } = body

    await this.taskService.update(id, {
      title,
      description,
      deadline,
      priority,
      status,
    })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.taskService.delete(id)
  }
}
