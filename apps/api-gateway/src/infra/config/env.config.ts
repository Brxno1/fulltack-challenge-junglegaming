import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return parseInt(
      this.configService.get<string>('API_GATEWAY_PORT') || '3001'
    );
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || '';
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN') || '15m';
  }

  get refreshTokenExpiresIn(): string {
    return this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN') || '7d';
  }

  get authServiceUrl(): string {
    return (
      this.configService.get<string>('AUTH_SERVICE_URL') ||
      'http://localhost:3002'
    );
  }

  get tasksServiceUrl(): string {
    return (
      this.configService.get<string>('TASKS_SERVICE_URL') ||
      'http://localhost:3003'
    );
  }

  get notificationsServiceUrl(): string {
    return (
      this.configService.get<string>('NOTIFICATIONS_SERVICE_URL') ||
      'http://localhost:3004'
    );
  }

  get apiGatewayUrl(): string {
    return (
      this.configService.get<string>('API_GATEWAY_URL') ||
      'http://localhost:3001'
    );
  }

  get frontendUrl(): string {
    return (
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000'
    );
  }

  get serviceTimeout(): number {
    return parseInt(
      this.configService.get<string>('SERVICE_TIMEOUT') || '5000'
    );
  }

  get logLevel(): string {
    return this.configService.get<string>('LOG_LEVEL') || 'info';
  }
}
