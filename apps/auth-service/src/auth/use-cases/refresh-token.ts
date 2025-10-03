import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { TokenService } from '../token.service';

interface Input { refreshToken: string };

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly tokens: TokenService, private readonly users: UserRepository) { }

  async execute(input: Input) {
    try {
      const payload = await this.tokens.verifyRefresh(input.refreshToken);

      const user = await this.users.findById(payload.sub);

      if (!user) throw new UnauthorizedException();

      const { password, ...rest } = user;

      return rest;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}


