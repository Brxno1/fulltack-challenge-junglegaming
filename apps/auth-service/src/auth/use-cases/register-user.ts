import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../repositories/user';
import type { CreateUserData, UserResponse } from '../../types';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly users: UsersRepository) { }

  async execute({ email, username, password }: CreateUserData): Promise<UserResponse> {
    const exists = await this.users.findByEmail(email);

    if (exists) {
      throw new UnauthorizedException('Registration failed')
    };

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.users.save({ email, username, password: passwordHash });


    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}