import { Controller, Get } from '@nestjs/common';

import { HealthServiceContract } from '@/contracts/healt.service.contract';
import { GatewayHealthResponse } from '@/types';

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthServiceContract) {}

  @Get()
  getHealth(): Promise<GatewayHealthResponse> {
    return this.healthService.getHealth();
  }
}
