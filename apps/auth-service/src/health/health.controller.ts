import { Controller, Get } from '@nestjs/common'

import { HealthResponse, HealthService } from '@/health/health.service'

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): Promise<HealthResponse> {
    return this.healthService.getHealth()
  }
}
