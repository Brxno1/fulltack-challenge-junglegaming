import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeormRefreshTokenBlacklistRepository } from '../infra/database/typeorm/typeorm-refresh-token-blacklist.repository'
import { TypeormUserRepository } from '../infra/database/typeorm/typeorm-user.repository'
import { JwtConfigModule } from '../infra/jwt/jwt.module'
import { TokenService } from '../infra/jwt/token.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthServiceContract } from './contracts/auht-service.contract'
import { TokenServiceContract } from './contracts/token.service.contract'
import { RefreshTokenBlacklist } from './entities/refresh-token-blacklist.entity'
import { User } from './entities/user.entity'
import { RefreshTokenBlacklistRepository } from './repositories/refresh-token-blacklist'
import { UsersRepository } from './repositories/user'
import { RefreshTokenBlacklistService } from './services/refresh-token-blacklist.service'
import { LoginUserUseCase } from './use-cases/login-user'
import { RegisterUserUseCase } from './use-cases/register-user'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshTokenBlacklist]),
    JwtConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUserUseCase,
    LoginUserUseCase,
    TokenService,
    RefreshTokenBlacklistService,
    { provide: AuthServiceContract, useClass: AuthService },
    { provide: UsersRepository, useClass: TypeormUserRepository },
    { provide: TokenServiceContract, useClass: TokenService },
    {
      provide: RefreshTokenBlacklistRepository,
      useClass: TypeormRefreshTokenBlacklistRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
