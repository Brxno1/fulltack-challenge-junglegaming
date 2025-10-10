import type { TaskCommentCreatedEvent } from '@/types'

export abstract class TaskCommentEventsContract {
  abstract publishTaskCommentCreated(
    event: TaskCommentCreatedEvent,
  ): Promise<void>
}
