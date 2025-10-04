import { INestApplication } from '@nestjs/common'
import {
  DocumentBuilder,
  SwaggerModule as NestSwaggerModule,
} from '@nestjs/swagger'

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Auth Service API')
      .setDescription(
        `
        Authentication microservice for Jungle Gaming Challenge.
        
        This service handles user authentication, registration, and token management.
        All endpoints require proper authentication except for registration and login.
        
        **Features:**
        - User registration and login
        - JWT token generation and refresh
        - Secure password hashing
        - Input validation
      `,
      )
      .setVersion('1.0')
      .setContact(
        'Jungle Gaming Team',
        'https://junglegaming.io',
        'dev@junglegaming.io',
      )
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        },
        'JWT',
      )
      .addServer('http://localhost:3002', 'Development')
      .addServer('https://api.junglegaming.io', 'Production')
      .build()

    const document = NestSwaggerModule.createDocument(app, config)
    NestSwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showRequestHeaders: true,
        showCommonExtensions: true,
        tryItOutEnabled: true,
      },
    })
  }
}
