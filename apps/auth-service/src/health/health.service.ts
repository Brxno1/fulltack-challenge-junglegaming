import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import type { DataSource } from 'typeorm'

export interface HealthResponse {
  status: string
  database: string
  timestamp: string
}

@Injectable()
export class HealthService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  private async checkDatabase(): Promise<{
    status: 'connected' | 'disconnected'
    timestamp: string
  }> {
    try {
      await this.dataSource.query('SELECT 1')
      return {
        status: 'connected',
        timestamp: new Date().toISOString(),
      }
    } catch {
      return {
        status: 'disconnected',
        timestamp: new Date().toISOString(),
      }
    }
  }

  async getHealth(): Promise<HealthResponse> {
    const { status, timestamp } = await this.checkDatabase()

    return {
      status: 'healthy',
      database: status,
      timestamp,
    }
  }
}
