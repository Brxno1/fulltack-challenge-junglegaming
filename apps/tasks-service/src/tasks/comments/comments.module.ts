import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormTaskCommentsRepository } from '@/infra/database/typeorm/typeorm-task-comments-repository'
import { TypeormTasksRepository } from '@/infra/database/typeorm/typeorm-tasks-repository'
import { EventsModule } from '@/tasks/events/events.module'

import { TasksCommentsContract } from '../contracts/tasks-comments-service.contract'
import { TaskCommentsRepository } from '../repositories/task-comments.repository'
import { TasksRepository } from '../repositories/tasks.repository'
import { CreateTaskCommentUseCase } from '../use-cases/create-task-comment'
import { ListTaskCommentsUseCase } from '../use-cases/list-task-comments'
import { TasksCommentsController } from './comments.controller'
import { TasksComments } from './comments.service'

@Module({
  imports: [DatabaseModule, EventsModule],
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
      provide: TasksCommentsContract,
      useClass: TasksComments,
    },
  ],
  exports: [TasksCommentsContract],
})
export class TasksCommentsModule { }
