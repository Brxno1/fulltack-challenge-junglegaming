import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common'

import { TaskAssignmentsServiceContract } from '../contracts/task-assignments-service.contract'
import { ListTaskAssignmentsQueryDto } from '../dtos/assignment.dtos'

@Controller('/tasks/:taskId/assignments')
export class TaskAssignmentsController {
  constructor(
    private readonly taskAssignments: TaskAssignmentsServiceContract,
  ) {}

  @Get()
  async list(
    @Param('taskId') taskId: string,
    @Query() query: ListTaskAssignmentsQueryDto,
  ) {
    const { assignments, total } = await this.taskAssignments.listByTask({
      taskId,
      page: query.page ?? 1,
      size: query.size ?? 50,
    })

    return { assignments, total }
  }

  @Post()
  async assignUserToTask(
    @Param('taskId') taskId: string,
    @Headers('x-authenticated-user-id') assignedBy: string,
    @Body() body: { userId: string },
  ): Promise<{ id: string }> {
    const { userId } = body

    const { id } = await this.taskAssignments.assignUser({
      taskId,
      author: userId,
      assignedBy,
    })

    return { id }
  }

  @Delete(':userId')
  async removeUserFromTask(
    @Param('taskId') taskId: string,
    @Param('userId') userId: string,
    @Headers('x-authenticated-user-id') removedBy: string,
  ): Promise<void> {
    await this.taskAssignments.removeUser(taskId, userId, removedBy)
  }
}
