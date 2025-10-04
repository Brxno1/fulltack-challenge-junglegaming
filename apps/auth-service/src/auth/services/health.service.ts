import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService {
  constructor() {}

  async getHealth(): Promise<{ status: string }> {
    return {
      status: 'healthy',
    }
  }
}
