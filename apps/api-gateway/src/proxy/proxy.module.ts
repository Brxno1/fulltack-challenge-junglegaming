import { Module } from '@nestjs/common';

import { ProxyServiceContract } from '@/contracts/proxy.service.contract';
import { ConfigModule } from '@/infra/config/config.module';

import { ProxyService } from './proxy.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: ProxyServiceContract,
      useClass: ProxyService,
    },
  ],
  exports: [ProxyServiceContract],
})
export class ProxyModule {}
