/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiBody } from '@nestjs/swagger'

import {
  LoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
} from '../dtos/auth.dtos'

export function ApiBodyWithExample(dto: any, example: any) {
  return ApiBody({
    type: dto,
    examples: {
      example1: {
        summary: 'Example request',
        value: example,
      },
    },
  })
}

export const AuthBodyExamples = {
  register: ApiBodyWithExample(RegisterUserDto, {
    email: 'user@example.com',
    username: 'johndoe',
    password: 'password123',
  }),

  login: ApiBodyWithExample(LoginUserDto, {
    email: 'user@example.com',
    password: 'password123',
  }),

  refresh: ApiBodyWithExample(RefreshTokenDto, {
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  }),
}
