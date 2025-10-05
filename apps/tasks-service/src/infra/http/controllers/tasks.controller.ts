import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { TaskService } from '@/tasks/task.service'

import { CreateTaskDto, ListTasksQueryDto } from '../dtos/tasks.dtos'

@Controller('/tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async list(@Query() query: ListTasksQueryDto) {
    return this.taskService.list({
      page: query.page ?? 1,
      size: query.size ?? 10,
    })
  }

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
}
