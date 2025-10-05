import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('TasksService')

  const configService = app.get(ConfigService)
  const port = parseInt(configService.get<string>('PORT') || '3003')

  await app.listen(port)

  logger.log(`🚀 Tasks Service running on port ${port}`)
}

bootstrap()
