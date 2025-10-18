import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import {
  AuthResponseDto,
  LoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
} from '../dtos/auth.dtos'

export const AuthSwaggerConfig = {
  controller: () => ApiTags('Authentication'),

  register: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Register a new user',
        description: 'Creates a new user account in the system',
      }),
      ApiBody({
        type: RegisterUserDto,
        description: 'Payload to register a new user',
      }),
      ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: AuthResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid payload',
      }),
      ApiResponse({
        status: 409,
        description: 'Email or username already exists',
      }),
    ),

  login: () =>
    applyDecorators(
      ApiOperation({
        summary: 'User login',
        description: 'Authenticates the user and returns JWT tokens',
      }),
      ApiBody({
        type: LoginUserDto,
        description: 'Login credentials',
      }),
      ApiResponse({
        status: 200,
        description: 'Login successfully performed',
        type: AuthResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid payload',
      }),
      ApiResponse({
        status: 401,
        description: 'Invalid credentials',
      }),
    ),

  refresh: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Refresh token',
        description: 'Renews the access token using the refresh token',
      }),
      ApiBody({
        type: RefreshTokenDto,
        description: 'Refresh token payload',
      }),
      ApiResponse({
        status: 200,
        description: 'Token successfully renewed',
        type: AuthResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid refresh token',
      }),
      ApiResponse({
        status: 401,
        description: 'Expired or invalid refresh token',
      }),
    ),
}
