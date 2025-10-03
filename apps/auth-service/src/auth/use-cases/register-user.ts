import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '@/auth/domain/user.repository';
import type { CreateUserData, UserResponse } from '@/types/auth';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly users: UserRepository) { }

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