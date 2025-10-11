import { OutboxRepository } from './outbox.repository'
import { TaskAssignmentsRepository } from './task-assignments.repository'
import { TaskCommentsRepository } from './task-comments.repository'
import { TasksRepository } from './tasks.repository'

export interface TransactionRepositories {
  tasks: TasksRepository
  outbox: OutboxRepository
  taskComments: TaskCommentsRepository
  taskAssignments: TaskAssignmentsRepository
}

export abstract class TransactionManager {
  abstract runInTransaction<T>(
    operation: (repositories: TransactionRepositories) => Promise<T>,
  ): Promise<T>
}
