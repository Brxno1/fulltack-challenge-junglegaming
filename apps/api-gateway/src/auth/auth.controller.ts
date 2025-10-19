import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthServiceContract } from '@/contracts/auth.service.contract';

import {
  LoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
} from '../dtos/auth.dtos';
import { AuthSwaggerConfig } from './auth.swagger.config';

@Controller('/api/auth')
@AuthSwaggerConfig.controller()
export class AuthController {
  constructor(private readonly authService: AuthServiceContract) {}

  @Post('/register')
  @HttpCode(201)
  @AuthSwaggerConfig.register()
  async register(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }

  @Post('/login')
  @HttpCode(200)
  @AuthSwaggerConfig.login()
  async login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }

  @Post('/refresh')
  @HttpCode(200)
  @AuthSwaggerConfig.refresh()
  async refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}
