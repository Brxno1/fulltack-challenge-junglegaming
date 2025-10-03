import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../domain/user.repository';

interface Input { email: string; password: string };

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly users: UserRepository) { }

  async execute(input: Input) {
    const user = await this.users.findByEmail(input.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await bcrypt.compare(input.password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    const { password, ...rest } = user;
    return rest;
  }
}


