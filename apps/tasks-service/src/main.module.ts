import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'

import { HealthModule } from './health/health.module'
import { MessagingModule } from './infra/messaging/messaging.module'
import { TaskAssignmentsModule } from './tasks/assignments/assignments.module'
import { TaskAuditLogModule } from './tasks/audit-log/audit-log.module'
import { TasksCommentsModule } from './tasks/comments/comments.module'
import { OutboxModule } from './tasks/outbox/outbox.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MessagingModule,
    OutboxModule,
    TasksModule,
    TasksCommentsModule,
    TaskAssignmentsModule,
    TaskAuditLogModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
