import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { HealthModule } from './health/health.module'
import { MessagingModule } from './infra/messaging/messaging.module'
import { TasksCommentsModule } from './tasks/comments/comments.module'
import { EventsModule } from './tasks/events/events.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagingModule,
    EventsModule,
    TasksModule,
    TasksCommentsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class MainModule {}
