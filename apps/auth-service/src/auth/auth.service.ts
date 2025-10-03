import { Injectable } from '@nestjs/common';
import { LoginDto, RefreshDto, RegisterDto } from './dto/auth.dtos';
import { RegisterUserUseCase } from './use-cases/register-user';
import { LoginUserUseCase } from './use-cases/login-user';
import { RefreshTokenUseCase } from './use-cases/refresh-token';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUc: RegisterUserUseCase,
    private readonly loginUc: LoginUserUseCase,
    private readonly refreshUc: RefreshTokenUseCase,
    private readonly tokens: TokenService,
  ) { }

  async register({ username, email, password }: RegisterDto) {
    const user = await this.registerUc.execute({ username, email, password });
    const tokens = await this.tokens.generate(user.id, user.email);

    return { user, ...tokens };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.loginUc.execute({ email, password });
    const tokens = await this.tokens.generate(user.id, user.email);

    return { user, ...tokens };
  }

  async refresh({ refreshToken }: RefreshDto) {
    const user = await this.refreshUc.execute({ refreshToken });
    const tokens = await this.tokens.generate(user.id, user.email);

    return { user, ...tokens };
  }
}


