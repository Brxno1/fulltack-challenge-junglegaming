import { AuthResponse } from '@jungle/types'
import { Body, Controller, Post } from '@nestjs/common'

import { AuthServiceContract } from '@/contracts/auth.service.contract'

import {
  LoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
} from '../dtos/auth.dtos'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceContract) {}

  @Post('/register')
  async register(@Body() registerData: RegisterUserDto): Promise<AuthResponse> {
    return this.authService.register(registerData)
  }

  @Post('/login')
  async login(@Body() loginData: LoginUserDto): Promise<AuthResponse> {
    return this.authService.login(loginData)
  }

  @Post('/refresh')
  async refresh(@Body() body: RefreshTokenDto): Promise<AuthResponse> {
    return this.authService.refreshTokens(body.refreshToken)
  }
}
