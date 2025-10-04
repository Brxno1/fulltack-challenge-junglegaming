import type { AuthResponse, CreateUserData, LoginUserData } from '../../types/auth.types'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AUTH_ERROR_MESSAGES } from '../constants/error-messages'
import { UsersRepository } from '../repositories/user'
import { LoginUserUseCase } from '../use-cases/login-user'
import { RegisterUserUseCase } from '../use-cases/register-user'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly tokenService: TokenService,
    private readonly users: UsersRepository,
  ) { }

  async register(data: CreateUserData): Promise<AuthResponse> {
    const user = await this.registerUser.execute(data)
    const tokens = await this.tokenService.generate(user.id, user.email)
    return { user, ...tokens }
  }

  async login(data: LoginUserData): Promise<AuthResponse> {
    const user = await this.loginUser.execute(data)
    const tokens = await this.tokenService.generate(user.id, user.email)
    return { user, ...tokens }
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = await this.tokenService.verifyRefresh(refreshToken)

      const user = await this.users.findById(payload.sub)

      if (!user)
        throw new UnauthorizedException(AUTH_ERROR_MESSAGES.USER_NOT_FOUND)

      const { password: _, ...userWithoutPassword } = user

      const tokens = await this.tokenService.generate(user.id, user.email)

      return { user: userWithoutPassword, ...tokens }
    } catch {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_TOKEN)
    }
  }
}
