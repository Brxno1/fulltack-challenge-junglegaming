import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppConfigService } from './infra/config/app.config'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)
  const logger = new Logger('AuthService')

  const configService = app.get(ConfigService)
  const appConfig = new AppConfigService(configService)

  const port = appConfig.port
  await app.listen(port)

  app.useGlobalPipes(appConfig.createValidationPipe())

  logger.log(`🚀 Auth Service running on port ${port}`)
}

bootstrap()
