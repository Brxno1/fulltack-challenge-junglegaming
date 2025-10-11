import { TaskCreatedEvent, TaskUpdatedEvent } from '@/types/task-events'

export abstract class TaskEventsContract {
  abstract publishTaskCreated(event: TaskCreatedEvent): Promise<void>
  abstract publishTaskUpdated(event: TaskUpdatedEvent): Promise<void>
}
