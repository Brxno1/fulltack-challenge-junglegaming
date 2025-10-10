import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { TypeormOutboxRepository } from '@/infra/database/typeorm/typeorm-outbox-repository'
import { MessagingModule } from '@/infra/messaging/messaging.module'
import { OutboxRepository } from '@/tasks/repositories/outbox.repository'

import { OutboxProcessor } from './outbox.processor'

@Module({
  imports: [DatabaseModule, MessagingModule],
  providers: [
    OutboxProcessor,
    {
      provide: OutboxRepository,
      useClass: TypeormOutboxRepository,
    },
  ],
  exports: [OutboxProcessor],
})
export class OutboxModule {}
