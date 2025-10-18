import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppConfigService } from './infra/config/app.config'
import { HttpExceptionFilter } from './infra/http/http-exception.filter'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)
  const logger = new Logger('AuthService')

  const configService = app.get(ConfigService)
  const appConfig = new AppConfigService(configService)

  const port = appConfig.port
  await app.listen(port)

  app.useGlobalPipes(appConfig.createValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())

  logger.log(`🚀 Auth Service running on port ${port}`)
}

bootstrap()
