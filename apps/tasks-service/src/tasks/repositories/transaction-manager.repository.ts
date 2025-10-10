import { OutboxRepository } from './outbox.repository'
import { TaskCommentsRepository } from './task-comments.repository'
import { TasksRepository } from './tasks.repository'

export interface TransactionRepositories {
  tasks: TasksRepository
  outbox: OutboxRepository
  taskComments: TaskCommentsRepository
}

export abstract class TransactionManager {
  abstract runInTransaction<T>(
    operation: (repositories: TransactionRepositories) => Promise<T>,
  ): Promise<T>
}
