export interface ProxyResponse<T> {
  data: T
  status: number
  error?: string
  headers: Record<string, string>
}

export interface ServiceConfig {
  name: string
  url: string
  timeout: number
}

export interface ServiceHealthStatus {
  [serviceName: string]: 'healthy' | 'unhealthy'
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ProxyRequestOptions<TData> {
  serviceName: string
  method: HttpMethod
  path: string
  data?: TData
  headers?: Record<string, string>
}
