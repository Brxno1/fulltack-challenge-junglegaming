import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseUserRepository } from '../infra/database/typeorm/typeorm-user.repository'
import { AuthController } from '../infra/http/controllers/auth.controller'
import { JwtConfigModule } from '../infra/jwt/jwt.module'
import { JwtStrategy } from '../infra/jwt/jwt.strategy'
import { User } from './entities/user.entity'
import { UsersRepository } from './repositories/user'
import { AuthService } from './services/auth.service'
import { TokenService } from './services/token.service'
import { LoginUserUseCase } from './use-cases/login-user'
import { RegisterUserUseCase } from './use-cases/register-user'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RegisterUserUseCase,
    LoginUserUseCase,
    TokenService,
    { provide: UsersRepository, useClass: DatabaseUserRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
