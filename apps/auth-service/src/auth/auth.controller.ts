import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, RegisterDto } from './dto/auth.dtos';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    const { username, email, password } = dto
    return this.authService.register({ username, email, password });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const { email, password } = dto
    return this.authService.login({ email, password });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@Body() dto: RefreshDto) {
    const { refreshToken } = dto
    return this.authService.refresh({ refreshToken });
  }
}


