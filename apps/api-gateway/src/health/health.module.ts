import { Module } from '@nestjs/common';

import { HealthServiceContract } from '@/contracts/healt.service.contract';
import { ProxyModule } from '@/proxy/proxy.module';

import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [ProxyModule],
  controllers: [HealthController],
  providers: [
    {
      provide: HealthServiceContract,
      useClass: HealthService,
    },
  ],
  exports: [],
})
export class HealthModule {}
