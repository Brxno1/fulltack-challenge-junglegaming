import {
  GatewayHealthResponse,
  ProxyRequestOptions,
  ProxyResponse,
} from '@/types'

export abstract class ProxyServiceContract {
  abstract forwardRequest<TResponse, TData>({
    serviceName,
    method,
    path,
    data,
    headers,
  }: ProxyRequestOptions<TData>): Promise<ProxyResponse<TResponse>>

  abstract checkServiceHealth(
    serviceName: string,
  ): Promise<ProxyResponse<GatewayHealthResponse>>
}
