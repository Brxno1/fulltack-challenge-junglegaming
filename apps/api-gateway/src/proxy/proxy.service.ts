import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { ProxyServiceContract } from '@/contracts/proxy.service.contract'
import { EnvConfigService } from '@/infra/config/env.config'
import {
  GatewayHealthResponse,
  ProxyRequestOptions,
  ProxyResponse,
} from '@/types'

@Injectable()
export class ProxyService extends ProxyServiceContract {
  constructor(private readonly envConfig: EnvConfigService) {
    super()
  }

  async forwardRequest<T>({
    serviceName,
    method,
    path,
    data,
  }: ProxyRequestOptions): Promise<ProxyResponse<T>> {
    const baseUrl = this.getServiceUrl(serviceName)

    const response = await axios.request({
      method,
      url: `${baseUrl}${path}`,
      timeout: this.envConfig.serviceTimeout,
      data,
    })

    console.log('response', JSON.stringify(response.status, null, 2))

    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    }
  }

  async checkServiceHealth(serviceName: string) {
    const response = await this.forwardRequest<GatewayHealthResponse>({
      serviceName,
      method: 'GET',
      path: '/health',
    })
    return response
  }

  private getServiceUrl(serviceName: string): string {
    switch (serviceName) {
      case 'auth':
        return this.envConfig.authServiceUrl
      case 'tasks':
        return this.envConfig.tasksServiceUrl
      default:
        throw new Error(`Unknown service: ${serviceName}`)
    }
  }
}
