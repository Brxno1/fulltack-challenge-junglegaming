import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { User } from '@/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth-guard';
import { TasksServiceContract } from '@/contracts/tasks.service.contract';
import {
  CreateTaskDto,
  ListTasksQueryDto,
  UpdateTaskDto,
} from '@/dtos/tasks.dto';

import { TasksSwaggerConfig } from './tasks.swagger.config';

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
@TasksSwaggerConfig.controller()
export class TasksController {
  constructor(private readonly tasksService: TasksServiceContract) {}

  @Get()
  @TasksSwaggerConfig.list()
  async list(@Query() query: ListTasksQueryDto) {
    return this.tasksService.list({
      page: query.page ?? 1,
      size: query.size ?? 100,
    });
  }

  @Get(':taskId')
  @TasksSwaggerConfig.findById()
  async findById(@Param('taskId') taskId: string) {
    return this.tasksService.findById(taskId);
  }

  @Post()
  @TasksSwaggerConfig.create()
  async create(
    @User() user: { email: string; userId: string },
    @Body() body: CreateTaskDto
  ) {
    const { title, description, deadline, priority, status } = body;
    return this.tasksService.create({
      actor: user.userId,
      title,
      description,
      deadline,
      priority,
      status,
    });
  }

  @Patch(':taskId')
  @TasksSwaggerConfig.update()
  async update(
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskDto,
    @User() user: { email: string; userId: string }
  ) {
    const { title, description, deadline, priority, status } = body;

    await this.tasksService.update(taskId, {
      actor: user.userId,
      title,
      description,
      deadline,
      priority,
      status,
    });
  }

  @Delete(':taskId')
  @TasksSwaggerConfig.delete()
  async delete(
    @Param('taskId') taskId: string,
    @User() user: { email: string; userId: string }
  ) {
    await this.tasksService.delete(taskId, user.userId);
  }
}
