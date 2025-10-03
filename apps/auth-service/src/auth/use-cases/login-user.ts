import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '@/auth/domain/user.repository';
import type { LoginUserData, UserResponse } from '@/types/auth';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly users: UserRepository) { }

  async execute({ email, password }: LoginUserData): Promise<UserResponse> {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    };

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials')
    };

    const { password: _password, ...userWithoutPassword } = user;

    return { ...userWithoutPassword };
  }
}


