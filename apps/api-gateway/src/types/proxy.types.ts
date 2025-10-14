export interface ProxyResponse<T> {
  data: T
  status: number
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

export interface ProxyRequestOptions {
  serviceName: string
  method: HttpMethod
  path: string
  data?: unknown | undefined
  headers?: Record<string, string>
}
