import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../domain/user.repository';

interface Input { email: string; username: string; password: string };

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly users: UserRepository) { }

  async execute({ email, username, password }: Input) {
    const exists = (await this.users.findByEmail(email));

    if (exists) throw new UnauthorizedException('Registration failed');

    const passwordHash = await bcrypt.hash(password, 10);

    const saved = await this.users.save({ email, username, password: passwordHash });

    return saved;
  }
}


