import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { AppConfigService } from './infra/config/app.config'
import { SwaggerConfig } from './infra/swagger/swagger.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('AuthService')

  const configService = app.get(ConfigService)
  const appConfig = new AppConfigService(configService)

  app.useGlobalPipes(appConfig.createValidationPipe())

  if (appConfig.isDevelopment) {
    SwaggerConfig.setup(app, configService)
  }

  const port = appConfig.port
  await app.listen(port)

  logger.log(`🚀 Auth Service running on port ${port}`)
  if (appConfig.isDevelopment) {
    logger.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`)
  }
}

bootstrap()
