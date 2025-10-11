import type { TaskCommentCreatedEvent } from '@/types/task-events'

export abstract class TaskCommentEventsContract {
  abstract publishTaskCommentCreated(
    event: TaskCommentCreatedEvent,
  ): Promise<void>
}
