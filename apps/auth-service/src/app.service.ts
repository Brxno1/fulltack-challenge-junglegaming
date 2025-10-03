import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() { }

  async getHealth(): Promise<{ status: string }> {
    return {
      status: 'healthy',
    }
  }
}
