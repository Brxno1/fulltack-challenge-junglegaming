import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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

  @HttpCode(200)
  @Get()
  async list(@Query() query: ListTasksQueryDto) {
    return this.taskService.list({
      page: query.page ?? 1,
      size: query.size ?? 10,
    })
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskService.findById(id)
  }

  @HttpCode(201)
  @Post()
  async create(@Body() body: CreateTaskDto) {
    return this.taskService.create({
      title: body.title,
      description: body.description ?? null,
      deadline: body.deadline ? new Date(body.deadline) : null,
      priority: body.priority,
      status: body.status,
    })
  }

  @HttpCode(204)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.taskService.update(id, {
      title: body.title,
      description: body.description ?? null,
      deadline: body.deadline ? new Date(body.deadline) : null,
      priority: body.priority,
      status: body.status,
    })
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id)
  }
}
