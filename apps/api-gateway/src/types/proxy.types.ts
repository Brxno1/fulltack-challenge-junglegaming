export interface ProxyResponse<TData> {
  data: TData;
  status: number;
  error?: string;
  headers: Record<string, string>;
}

export interface ProxyRequestOptions {
  serviceName: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  data?: unknown;
  headers?: Record<string, string>;
}

export interface ServiceConfig {
  name: string;
  url: string;
  timeout: number;
}

export interface ServiceHealthStatus {
  [serviceName: string]: 'healthy' | 'unhealthy';
}
