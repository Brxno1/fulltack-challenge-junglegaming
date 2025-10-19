import {
 Body,
 Controller,
 Delete,
 Get,
 Param,
 Post,
 Query,
 UseGuards,
} from '@nestjs/common'

import { User } from '@/auth/decorators/user.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth-guard'
import { TaskAssignmentsServiceContract } from '@/contracts/task-assignments.service.contract'
import {
 CreateTaskAssignmentDto,
 CreateTaskAssignmentResponseDto,
 ListTaskAssignmentsQueryDto,
 PaginatedTaskAssignmentsResponseDto,
 TaskIdParamDto,
 UserIdParamDto,
} from '@/dtos/task-assignments.dto'

@Controller('/api/tasks/:taskId/assignments')
@UseGuards(JwtAuthGuard)
export class TaskAssignmentsController {
 constructor(
  private readonly taskAssignmentsService: TaskAssignmentsServiceContract,
 ) { }

 @Get()
 async list(
  @Param() params: TaskIdParamDto,
  @Query() query: ListTaskAssignmentsQueryDto,
 ): Promise<PaginatedTaskAssignmentsResponseDto> {
  const { taskId } = params
  const { page = 1, size = 50 } = query

  const result = await this.taskAssignmentsService.listByTask({
   taskId,
   page,
   size,
  })

  return {
   assignments: result.assignments,
   total: result.total,
  }
 }

 @Post()
 async assignUser(
  @Param() params: TaskIdParamDto,
  @User() user: { userId: string },
  @Body() body: CreateTaskAssignmentDto,
 ): Promise<CreateTaskAssignmentResponseDto> {
  const { taskId } = params
  const { userId } = body

  console.log('🔍 API Gateway Assignments Controller - taskId:', taskId)
  console.log(
   '🔍 API Gateway Assignments Controller - assignedBy:',
   user.userId,
  )
  console.log('🔍 API Gateway Assignments Controller - userId:', userId)

  const { id } = await this.taskAssignmentsService.assignUser({
   taskId,
   userId,
   assignedBy: user.userId,
  })

  return { id }
 }

 @Delete(':userId')
 async removeUser(
  @Param() params: TaskIdParamDto & UserIdParamDto,
  @User() user: { userId: string },
 ): Promise<void> {
  const { taskId, userId } = params

  await this.taskAssignmentsService.removeUser(taskId, userId, user.userId)
 }
}
