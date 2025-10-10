import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OutboxEvent } from '@/tasks/entities/outbox-event.entity'
import { TaskAssignment } from '@/tasks/entities/task-assignment.entity'
import { TaskAuditLog } from '@/tasks/entities/task-audit-log.entity'
import { TaskComment } from '@/tasks/entities/task-comment.entity'
import { Task } from '@/tasks/entities/tasks.entity'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [
          Task,
          TaskComment,
          TaskAuditLog,
          TaskAssignment,
          OutboxEvent,
        ],
        synchronize: config.get<string>('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([
      Task,
      TaskComment,
      TaskAuditLog,
      TaskAssignment,
      OutboxEvent,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
