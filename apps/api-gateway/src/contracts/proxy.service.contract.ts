import { ProxyRequestOptions, ProxyResponse, ServiceHealthInfo } from '@/types';

export abstract class ProxyServiceContract {
  abstract forwardRequest<TData>(
    options: ProxyRequestOptions
  ): Promise<ProxyResponse<TData>>;

  abstract checkServiceHealth(
    serviceName: string
  ): Promise<ProxyResponse<ServiceHealthInfo>>;
}
