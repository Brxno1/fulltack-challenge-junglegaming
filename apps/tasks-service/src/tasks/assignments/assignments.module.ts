import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormTaskAssignmentsRepository } from '@/infra/database/typeorm/typeorm-task-assignments-repository'
import { TypeormTasksRepository } from '@/infra/database/typeorm/typeorm-tasks-repository'
import { TypeormTransactionManager } from '@/infra/database/typeorm/typeorm-transaction-manager'
import { TaskAssignmentsRepository } from '@/tasks/repositories/task-assignments.repository'
import { TasksRepository } from '@/tasks/repositories/tasks.repository'
import { TransactionManager } from '@/tasks/repositories/transaction-manager.repository'

import { TaskAssignmentsServiceContract } from '../contracts/task-assignments-service.contract'
import { AssignUserToTaskUseCase } from '../use-cases/assign-user-to-task'
import { ListTaskAssignmentsUseCase } from '../use-cases/list-task-assignments'
import { RemoveUserFromTaskUseCase } from '../use-cases/remove-user-from-task'
import { TaskAssignmentsController } from './assignments.controller'
import { TaskAssignmentsService } from './assignments.service'

@Module({
  imports: [DatabaseModule],
  controllers: [TaskAssignmentsController],
  providers: [
    AssignUserToTaskUseCase,
    RemoveUserFromTaskUseCase,
    ListTaskAssignmentsUseCase,
    {
      provide: TasksRepository,
      useClass: TypeormTasksRepository,
    },
    {
      provide: TaskAssignmentsRepository,
      useClass: TypeormTaskAssignmentsRepository,
    },
    {
      provide: TransactionManager,
      useClass: TypeormTransactionManager,
    },
    {
      provide: TaskAssignmentsServiceContract,
      useClass: TaskAssignmentsService,
    },
  ],
  exports: [TaskAssignmentsServiceContract],
})
export class TaskAssignmentsModule { }
