import { Module } from '@nestjs/common'

import { HealthController } from '../infra/http/controllers/health.controller'
import { HealthService } from './services/health.service'

@Module({
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
