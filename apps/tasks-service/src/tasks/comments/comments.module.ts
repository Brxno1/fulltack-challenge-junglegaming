import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormTaskCommentsRepository } from '@/infra/database/typeorm/typeorm-task-comments-repository'
import { TypeormTasksRepository } from '@/infra/database/typeorm/typeorm-tasks-repository'
import { TypeormTransactionManager } from '@/infra/database/typeorm/typeorm-transaction-manager'

import { TasksCommentsContract } from '../contracts/tasks-comments-service.contract'
import { OutboxModule } from '../outbox/outbox.module'
import { TaskCommentsRepository } from '../repositories/task-comments.repository'
import { TasksRepository } from '../repositories/tasks.repository'
import { TransactionManager } from '../repositories/transaction-manager.repository'
import { CreateTaskCommentUseCase } from '../use-cases/create-task-comment'
import { ListTaskCommentsUseCase } from '../use-cases/list-task-comments'
import { TasksCommentsController } from './comments.controller'
import { TasksCommentsService } from './comments.service'

@Module({
  imports: [DatabaseModule, OutboxModule],
  controllers: [TasksCommentsController],
  providers: [
    CreateTaskCommentUseCase,
    ListTaskCommentsUseCase,
    {
      provide: TaskCommentsRepository,
      useClass: TypeormTaskCommentsRepository,
    },
    {
      provide: TasksRepository,
      useClass: TypeormTasksRepository,
    },
    {
      provide: TransactionManager,
      useClass: TypeormTransactionManager,
    },
    {
      provide: TasksCommentsContract,
      useClass: TasksCommentsService,
    },
  ],
  exports: [TasksCommentsContract],
})
export class TasksCommentsModule {}
