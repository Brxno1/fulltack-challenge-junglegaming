import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { DatabaseModule } from './infra/database/database.module'
import { JwtConfigModule } from './infra/jwt/jwt.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
    }),
    DatabaseModule,
    AuthModule,
    JwtConfigModule,
    HealthModule,
  ],
})
export class MainModule {}
