import {
  GatewayHealthResponse,
  ProxyRequestOptions,
  ProxyResponse,
} from '@/types'

export abstract class ProxyServiceContract {
  abstract forwardRequest<T>({
    serviceName,
    method,
    path,
    data,
    headers,
  }: ProxyRequestOptions): Promise<ProxyResponse<T>>

  abstract checkServiceHealth(
    serviceName: string,
  ): Promise<ProxyResponse<GatewayHealthResponse>>
}
