import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormTaskAuditLogRepository } from '@/infra/database/typeorm/typeorm-task-audit-log-repository'

import { TaskAuditLogServiceContract } from '../contracts/task-audit-log-service.contract'
import { TaskAuditLogRepository } from '../repositories/task-audit-log.repository'
import { CreateTaskAuditLogUseCase } from '../use-cases/create-task-audit-log'
import { ListTaskHistoryUseCase } from '../use-cases/list-task-history'
import { TaskAuditLogController } from './audit-log.controller'
import { TaskAuditLogService } from './audit-log.service'

@Module({
  imports: [DatabaseModule],
  controllers: [TaskAuditLogController],
  providers: [
    CreateTaskAuditLogUseCase,
    ListTaskHistoryUseCase,
    {
      provide: TaskAuditLogRepository,
      useClass: TypeormTaskAuditLogRepository,
    },
    {
      provide: TaskAuditLogServiceContract,
      useClass: TaskAuditLogService,
    },
  ],
  exports: [TaskAuditLogServiceContract],
})
export class TaskAuditLogModule {}
