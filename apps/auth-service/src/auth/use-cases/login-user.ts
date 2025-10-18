import { AUTH_ERROR_MESSAGES } from '@jungle/constants'
import type { LoginUserData, User } from '@jungle/types'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UsersRepository } from '../repositories/user'

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly users: UsersRepository) {}

  async execute({ email, password }: LoginUserData): Promise<User> {
    const user = await this.users.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
    }

    const { password: _password, ...userWithoutPassword } = user

    return { ...userWithoutPassword }
  }
}
