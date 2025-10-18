import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { ProxyServiceContract } from '@/contracts/proxy.service.contract'
import { EnvConfigService } from '@/infra/config/env.config'
import { ProxyRequestOptions, ProxyResponse, ServiceHealthInfo } from '@/types'

@Injectable()
export class ProxyService extends ProxyServiceContract {
  constructor(private readonly envConfig: EnvConfigService) {
    super()
  }

  async forwardRequest<TData>({
    serviceName,
    method,
    path,
    data,
    headers,
  }: ProxyRequestOptions): Promise<ProxyResponse<TData>> {
    const baseUrl = this.getServiceUrl(serviceName)

    try {
      const response = await axios.request({
        method,
        url: `${baseUrl}${path}`,
        timeout: this.envConfig.serviceTimeout,
        data,
        headers,
      })

      return {
        data: response.data,
        status: response.status,
        error: response.data.error,
        headers: response.headers as Record<string, string>,
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          error: error.response.data.error,
          headers: error.response.headers as Record<string, string>,
        }
      }

      throw error
    }
  }

  async checkServiceHealth(
    serviceName: string,
  ): Promise<ProxyResponse<ServiceHealthInfo>> {
    return this.forwardRequest({
      serviceName,
      method: 'GET',
      path: '/health',
    })
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
