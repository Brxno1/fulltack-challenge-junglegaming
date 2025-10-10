import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormTasksRepository } from '@/infra/database/typeorm/typeorm-tasks-repository'
import { TypeormTransactionManager } from '@/infra/database/typeorm/typeorm-transaction-manager'
import { EventsModule } from '@/tasks/events/events.module'
import { OutboxModule } from '@/tasks/outbox/outbox.module'
import { TasksRepository } from '@/tasks/repositories/tasks.repository'
import { TransactionManager } from '@/tasks/repositories/transaction-manager.repository'
import { TasksController } from '@/tasks/tasks.controller'
import { TasksService } from '@/tasks/tasks.service'
import { CreateTaskUseCase } from '@/tasks/use-cases/create-task'
import { DeleteTaskUseCase } from '@/tasks/use-cases/delete-task'
import { GetTaskByIdUseCase } from '@/tasks/use-cases/get-task-by-id'
import { ListTasksUseCase } from '@/tasks/use-cases/list-tasks'
import { UpdateTaskUseCase } from '@/tasks/use-cases/update-tasks'

import { TasksServiceContract } from './contracts/tasks-service.contract'

@Module({
  imports: [DatabaseModule, EventsModule, OutboxModule],
  controllers: [TasksController],
  providers: [
    GetTaskByIdUseCase,
    ListTasksUseCase,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    { provide: TasksRepository, useClass: TypeormTasksRepository },
    { provide: TransactionManager, useClass: TypeormTransactionManager },
    { provide: TasksServiceContract, useClass: TasksService },
  ],
  exports: [],
})
export class TasksModule { }
