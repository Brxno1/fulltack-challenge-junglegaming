import { Injectable } from '@nestjs/common';

import { HealthServiceContract } from '@/contracts/healt.service.contract';
import { ProxyServiceContract } from '@/contracts/proxy.service.contract';
import { GatewayHealthResponse, ServiceHealthInfo } from '@/types';

@Injectable()
export class HealthService implements HealthServiceContract {
  constructor(private readonly proxyService: ProxyServiceContract) {}

  async getHealth(): Promise<GatewayHealthResponse> {
    const [auth, tasks] = await Promise.all([
      this.getServiceHealth('auth'),
      this.getServiceHealth('tasks'),
    ]);

    return {
      services: {
        auth,
        tasks,
      },
    };
  }

  private async getServiceHealth(
    serviceName: string
  ): Promise<ServiceHealthInfo> {
    const response = await this.proxyService.forwardRequest<ServiceHealthInfo>({
      serviceName,
      method: 'GET',
      path: '/health',
    });

    return response.data;
  }
}
