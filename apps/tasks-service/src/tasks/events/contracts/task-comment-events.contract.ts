import type { TaskCommentCreatedEvent } from '@jungle/types'

export abstract class TaskCommentEventsContract {
  abstract publishTaskCommentCreated(
    event: TaskCommentCreatedEvent,
  ): Promise<void>
}
