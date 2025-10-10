import { ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'

export const getRabbitMQClientOptions = (config: ConfigService) => {
  const url = config.get<string>('RABBITMQ_URL')!

  return {
    transport: Transport.RMQ as const,
    options: {
      urls: [url],
      queue: 'tasks_queue',
      queueOptions: {
        durable: true,
      },
    },
  }
}
