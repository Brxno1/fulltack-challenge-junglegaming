import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeormUserRepository } from '../infra/database/typeorm/typeorm-user.repository'
import { JwtConfigModule } from '../infra/jwt/jwt.module'
import { AuthController } from './auth.controller'
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
    RegisterUserUseCase,
    LoginUserUseCase,
    TokenService,
    { provide: UsersRepository, useClass: TypeormUserRepository },
  ],
  exports: [AuthService],
})
export class AuthModule { }
