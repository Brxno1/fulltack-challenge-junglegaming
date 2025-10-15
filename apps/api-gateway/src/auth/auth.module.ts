import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { AuthServiceContract } from '@/contracts/auth.service.contract'
import { ProxyModule } from '@/proxy/proxy.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth-guard'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ProxyModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    { provide: AuthServiceContract, useClass: AuthService },
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
