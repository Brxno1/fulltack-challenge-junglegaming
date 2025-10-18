import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppConfigService } from './infra/config/app.config'
import { LoggingInterceptor } from './infra/interceptors/logging.interceptor'
import { SwaggerConfig } from './infra/swagger/swagger.config'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)
  const logger = new Logger('ApiGateway')

  const configService = app.get(ConfigService)
  const appConfig = new AppConfigService(configService)

  app.useGlobalPipes(appConfig.createValidationPipe())

  app.useGlobalInterceptors(new LoggingInterceptor())

  app.enableCors({
    origin: appConfig.frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  SwaggerConfig.setup(app)

  const port = appConfig.port
  await app.listen(port)

  logger.log(`🚀 API Gateway running on port ${port}`)
  logger.log(`📚 Health check available at http://localhost:${port}/health`)
  logger.log(
    `📖 Swagger documentation available at http://localhost:${port}/api/docs`,
  )
}

bootstrap()
