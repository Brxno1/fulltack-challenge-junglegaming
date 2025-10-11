import { Controller, Get, Param, Query } from '@nestjs/common'

import { TaskAuditLogServiceContract } from '../contracts/task-audit-log-service.contract'
import { ListTaskHistoryQueryDto } from '../dtos/list-task-history.dto'

@Controller('/tasks/:taskId/history')
export class TaskAuditLogController {
  constructor(
    private readonly taskAuditLogService: TaskAuditLogServiceContract,
  ) {}

  @Get()
  async list(
    @Param('taskId') taskId: string,
    @Query() query: ListTaskHistoryQueryDto,
  ) {
    const { auditLogs, total } = await this.taskAuditLogService.listByTask({
      taskId,
      page: query.page ?? 1,
      size: query.size ?? 50,
    })

    return { auditLogs, total }
  }
}
