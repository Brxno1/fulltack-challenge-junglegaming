import type { CreateUserData, UserResponse } from '@jungle/types'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { AUTH_ERROR_MESSAGES } from '../constants/error-messages'
import { UsersRepository } from '../repositories/user'

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly users: UsersRepository) {}

  async execute({
    email,
    username,
    password,
  }: CreateUserData): Promise<UserResponse> {
    const exists = await this.users.findByEmail(email)

    if (exists) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.REGISTRATION_FAILED)
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
