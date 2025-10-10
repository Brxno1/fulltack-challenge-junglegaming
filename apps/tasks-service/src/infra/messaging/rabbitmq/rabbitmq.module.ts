import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'

import { MessagingRepository } from '@/tasks/repositories/messaging.repository'

import { getRabbitMQClientOptions } from './rabbitmq.config'
import { RabbitMQMessagingRepository } from './rabbitmq-messaging.repository'

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) =>
          getRabbitMQClientOptions(configService),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    {
      provide: MessagingRepository,
      useClass: RabbitMQMessagingRepository,
    },
  ],
  exports: [MessagingRepository],
})
export class RabbitMQModule {}
