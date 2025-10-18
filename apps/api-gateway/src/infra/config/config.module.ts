import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import { AppConfigService } from './app.config'
import { EnvConfigService } from './env.config'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  providers: [AppConfigService, EnvConfigService],
  exports: [AppConfigService, EnvConfigService],
})
export class ConfigModule {}
