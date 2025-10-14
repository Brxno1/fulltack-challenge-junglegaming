import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { ConfigModule } from './infra/config/config.module'
import { ProxyModule } from './proxy/proxy.module'

@Module({
  imports: [ConfigModule, ProxyModule, AuthModule, HealthModule],
})
export class MainModule {}
