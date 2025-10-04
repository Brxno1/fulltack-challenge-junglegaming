import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) { }

  get port(): number {
    return parseInt(this.configService.get<string>('PORT') || '3002');
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  createValidationPipe(): ValidationPipe {
    return new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
    });
  }
}
