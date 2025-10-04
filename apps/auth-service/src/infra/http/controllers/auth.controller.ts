import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from '@/auth/services/auth.service'
import { AuthResponse } from '@/types/auth.types'

import { applySwaggerDocs, AuthDocs } from '../docs'
import { AuthBodyExamples } from '../docs/body-examples'
import type {
  LoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
} from '../dtos/auth.dtos'

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @applySwaggerDocs(
    AuthDocs.register.operation,
    AuthDocs.register.responses,
    AuthBodyExamples.register,
  )
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() body: RegisterUserDto): Promise<AuthResponse> {
    return this.auth.register({
      username: body.username,
      email: body.email,
      password: body.password,
    })
  }

  @applySwaggerDocs(
    AuthDocs.login.operation,
    AuthDocs.login.responses,
    AuthBodyExamples.login,
  )
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<AuthResponse> {
    return this.auth.login({
      email: body.email,
      password: body.password,
    })
  }

  @applySwaggerDocs(
    AuthDocs.refresh.operation,
    AuthDocs.refresh.responses,
    AuthBodyExamples.refresh,
  )
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@Body() body: RefreshTokenDto): Promise<AuthResponse> {
    return this.auth.refresh(body.refreshToken)
  }
}
