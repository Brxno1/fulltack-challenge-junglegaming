import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../repositories/user';
import type { LoginUserData, UserResponse } from '../../types';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly users: UsersRepository) { }

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


