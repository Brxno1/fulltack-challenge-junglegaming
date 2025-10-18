import { AUTH_ERROR_MESSAGES } from '@jungle/constants'
import type { CreateUserData, User } from '@jungle/types'
import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UsersRepository } from '../repositories/user'

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly users: UsersRepository) {}

  async execute({ email, username, password }: CreateUserData): Promise<User> {
    const exists = await this.users.findByEmail(email)

    if (exists) {
      throw new ConflictException(AUTH_ERROR_MESSAGES.REGISTRATION_FAILED)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await this.users.save({
      email,
      username,
      password: passwordHash,
    })

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
