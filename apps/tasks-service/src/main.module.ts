import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { HealthModule } from './health/health.module'
import { TasksCommentsModule } from './tasks/comments/comments.module'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    TasksCommentsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class MainModule {}
