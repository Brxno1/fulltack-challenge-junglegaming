import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormTasksRepository } from '@/infra/database/typeorm/typeorm-tasks-repository'
import { TasksController } from '@/infra/http/controllers/tasks.controller'

import { TasksRepository } from './repositories/tasks.repository'
import { TaskService } from './task.service'
import { CreateTaskUseCase } from './use-cases/create-task'
import { ListTasksUseCase } from './use-cases/list-tasks'

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [
    TaskService,
    CreateTaskUseCase,
    ListTasksUseCase,
    { provide: TasksRepository, useClass: TypeormTasksRepository },
  ],
  exports: [],
})
export class TasksModule { }
