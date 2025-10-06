import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

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
        entities: [Task],
        synchronize: config.get<string>('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
