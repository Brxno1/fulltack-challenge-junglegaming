import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormTasksRepository } from '@/infra/database/typeorm/typeorm-tasks-repository'
import { TasksController } from '@/tasks/tasks.controller'

import { TasksServiceContract } from './contracts/tasks-service.contract'
import { TasksRepository } from './repositories/tasks.repository'
import { TasksService } from './tasks.service'
import { CreateTaskUseCase } from './use-cases/create-task'
import { DeleteTaskUseCase } from './use-cases/delete-task'
import { GetTaskByIdUseCase } from './use-cases/get-task-by-id'
import { ListTasksUseCase } from './use-cases/list-tasks'
import { UpdateTaskUseCase } from './use-cases/update-tasks'

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [
    GetTaskByIdUseCase,
    ListTasksUseCase,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    { provide: TasksRepository, useClass: TypeormTasksRepository },
    { provide: TasksServiceContract, useClass: TasksService },
  ],
  exports: [],
})
export class TasksModule {}
