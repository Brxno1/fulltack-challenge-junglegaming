import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './domain/user.repository';
import type { JwtPayload } from './jwt.strategy';
import type { TokenPair } from '@/types/auth';
import type { AuthResponse } from '@/types/auth';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly users: UserRepository
  ) { }

  async generate(userId: string, email: string): Promise<TokenPair> {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN') || '15m',
      },
    );
    const refreshToken = await this.jwt.signAsync(
      { sub: userId, email, type: 'refresh' },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>('REFRESH_TOKEN_EXPIRES_IN') || '7d',
      },
    );
    return { accessToken, refreshToken };
  }

  async verifyRefresh(refreshToken: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken,
        { secret: this.config.get<string>('JWT_SECRET') }
      );

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }


  async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = await this.verifyRefresh(refreshToken);

      const user = await this.users.findById(payload.sub);

      if (!user) throw new UnauthorizedException('User not found');

      const { password, ...userWithoutPassword } = user;

      const tokens = await this.generate(user.id, user.email);

      return { user: userWithoutPassword, ...tokens };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}