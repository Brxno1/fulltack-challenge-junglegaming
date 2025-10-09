import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import type { LoginUserData, UserResponse } from '../../types/auth.types'
import { AUTH_ERROR_MESSAGES } from '../constants/error-messages'
import { UsersRepository } from '../repositories/user'

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly users: UsersRepository) {}

  async execute({ email, password }: LoginUserData): Promise<UserResponse> {
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
