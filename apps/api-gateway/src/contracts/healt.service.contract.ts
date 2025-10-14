import { GatewayHealthResponse } from '@/types'

export abstract class HealthServiceContract {
  abstract getHealth(): Promise<GatewayHealthResponse>
}
