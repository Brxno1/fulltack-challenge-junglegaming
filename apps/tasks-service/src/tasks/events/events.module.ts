import { Module } from '@nestjs/common'

import { MessagingModule } from '@/infra/messaging/messaging.module'

import { TaskCommentEventsContract } from './contracts/task-comment-events.contract'
import { TaskEventsContract } from './contracts/task-events.contract'
import { TaskCommentEventsPublisher } from './publishers/task-comment-events.publisher'
import { TaskEventsPublisher } from './publishers/task-events.publisher'

@Module({
  imports: [MessagingModule],
  providers: [
    {
      provide: TaskEventsContract,
      useClass: TaskEventsPublisher,
    },
    {
      provide: TaskCommentEventsContract,
      useClass: TaskCommentEventsPublisher,
    },
  ],
  exports: [TaskEventsContract, TaskCommentEventsContract],
})
export class EventsModule {}
