import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)
  const logger = new Logger('TaskService')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  )

  const configService = app.get(ConfigService)
  const port = parseInt(configService.get<string>('PORT') || '3003')

  await app.listen(port)

  logger.log(`🚀 Tasks Service running on port ${port}`)
}

bootstrap()
