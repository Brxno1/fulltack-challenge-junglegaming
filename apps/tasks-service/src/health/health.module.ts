import { Module } from '@nestjs/common'

import { HealthController } from '@/health/health.controller'
import { HealthService } from '@/health/health.service'
import { DatabaseModule } from '@/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
