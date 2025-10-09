import { Body, Controller, Post } from '@nestjs/common'

import { AuthResponse } from '@/types/auth.types'

import { AuthServiceContract } from './contracts/auht-service.contract'
import type {
  LoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
} from './dtos/auth.dtos'

@Controller('/auth')
export class AuthController {
  constructor(private readonly auth: AuthServiceContract) {}

  @Post('/register')
  async register(@Body() body: RegisterUserDto): Promise<AuthResponse> {
    const { username, email, password } = body
    const { user, accessToken, refreshToken } = await this.auth.register({
      username,
      email,
      password,
    })

    return { user, accessToken, refreshToken }
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<AuthResponse> {
    const { user, accessToken, refreshToken } = await this.auth.login({
      email: body.email,
      password: body.password,
    })

    return { user, accessToken, refreshToken }
  }

  @Post('/refresh')
  async refresh(@Body() body: RefreshTokenDto): Promise<AuthResponse> {
    const { user, refreshToken, accessToken } = await this.auth.refresh(
      body.refreshToken,
    )

    return { user, refreshToken, accessToken }
  }
}
