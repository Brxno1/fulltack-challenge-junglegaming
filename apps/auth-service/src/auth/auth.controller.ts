import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import type { LoginUserDto, RefreshTokenDto, RegisterUserDto } from './dto/auth.dtos';
import type { AuthResponse } from '@/types/auth';

@Controller('/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post('/register')
  async register(@Body() body: RegisterUserDto): Promise<AuthResponse> {
    return this.auth.register({
      username: body.username,
      email: body.email,
      password: body.password
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<AuthResponse> {
    return this.auth.login({
      email: body.email,
      password: body.password
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@Body() body: RefreshTokenDto): Promise<AuthResponse> {
    return this.auth.refresh(body.refreshToken);
  }
}
