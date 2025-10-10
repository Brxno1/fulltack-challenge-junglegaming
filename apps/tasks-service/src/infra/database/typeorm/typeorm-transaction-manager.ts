import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { OutboxEvent } from '@/tasks/entities/outbox-event.entity'
import { Task } from '@/tasks/entities/tasks.entity'
import {
  TransactionManager,
  TransactionRepositories,
} from '@/tasks/repositories/transaction-manager.repository'

import { TypeormOutboxRepository } from './typeorm-outbox-repository'
import { TypeormTasksRepository } from './typeorm-tasks-repository'

@Injectable()
export class TypeormTransactionManager implements TransactionManager {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async runInTransaction<T>(
    operation: (repositories: TransactionRepositories) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(async (manager) => {
      const transactionRepositories: TransactionRepositories = {
        tasks: new TypeormTasksRepository(manager.getRepository(Task)),
        outbox: new TypeormOutboxRepository(manager.getRepository(OutboxEvent)),
      }

      return operation(transactionRepositories)
    })
  }
}
