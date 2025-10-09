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

  private async checkDatabase(): Promise<'connected' | 'disconnected'> {
    try {
      await this.dataSource.query('SELECT 1')
      return 'connected'
    } catch {
      return 'disconnected'
    }
  }

  async getHealth(): Promise<HealthResponse> {
    const database = await this.checkDatabase()

    return {
      status: 'healthy',
      database,
      timestamp: new Date().toISOString(),
    }
  }
}
