import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserUseCase } from '../use-cases/register-user';
import { LoginUserUseCase } from '../use-cases/login-user';
import { TokenService } from './token.service';
import { UsersRepository } from '../repositories/user';
import type { AuthResponse, CreateUserData, LoginUserData } from '../../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly tokenService: TokenService,
    private readonly users: UsersRepository,
  ) { }

  async register(data: CreateUserData): Promise<AuthResponse> {
    const user = await this.registerUser.execute(data);
    const tokens = await this.tokenService.generate(user.id, user.email);
    return { user, ...tokens };
  }

  async login(data: LoginUserData): Promise<AuthResponse> {
    const user = await this.loginUser.execute(data);
    const tokens = await this.tokenService.generate(user.id, user.email);
    return { user, ...tokens };
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = await this.tokenService.verifyRefresh(refreshToken);

      const user = await this.users.findById(payload.sub);

      if (!user) throw new UnauthorizedException('User not found');

      const { password, ...userWithoutPassword } = user;

      const tokens = await this.tokenService.generate(user.id, user.email);

      return { user: userWithoutPassword, ...tokens };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
