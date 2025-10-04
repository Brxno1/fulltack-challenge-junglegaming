import { Controller, Get } from '@nestjs/common'

import { HealthService } from '@/health/services/health.service'

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): Promise<{ status: string }> {
    return this.healthService.getHealth()
  }
}
