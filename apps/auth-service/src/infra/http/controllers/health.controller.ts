import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import { HealthResponse, HealthService } from '@/health/services/health.service'

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getHealth(): Promise<HealthResponse> {
    return this.healthService.getHealth()
  }
}
