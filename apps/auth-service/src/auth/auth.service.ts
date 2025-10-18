import { AUTH_ERROR_MESSAGES } from '@jungle/constants'
import type { AuthResponse, CreateUserData, LoginUserData } from '@jungle/types'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { TokenServiceContract } from './contracts/token.service.contract'
import { UsersRepository } from './repositories/user'
import { LoginUserUseCase } from './use-cases/login-user'
import { RegisterUserUseCase } from './use-cases/register-user'

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly tokenService: TokenServiceContract,
    private readonly users: UsersRepository,
  ) {}

  async register({
    email,
    username,
    password,
  }: CreateUserData): Promise<AuthResponse> {
    const user = await this.registerUser.execute({ email, username, password })
    const tokens = await this.tokenService.generate(user.id, user.email)

    return { user, ...tokens }
  }

  async login({ email, password }: LoginUserData): Promise<AuthResponse> {
    const user = await this.loginUser.execute({ email, password })

    const tokens = await this.tokenService.generate(user.id, user.email)

    return { user, ...tokens }
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = await this.tokenService.verifyRefresh(refreshToken)

      await this.tokenService.invalidateRefreshToken(refreshToken)

      const user = await this.users.findById(payload.sub)

      if (!user) {
        throw new UnauthorizedException(AUTH_ERROR_MESSAGES.USER_NOT_FOUND)
      }

      const { password: _, ...userWithoutPassword } = user

      const tokens = await this.tokenService.generate(user.id, user.email)

      return { user: userWithoutPassword, ...tokens }
    } catch {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_TOKEN)
    }
  }
}
