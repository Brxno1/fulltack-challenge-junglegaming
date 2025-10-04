import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { AuthResponseSchema } from './auth.schemas'

export const AuthDocs = {
  register: {
    operation: (): MethodDecorator =>
      ApiOperation({ summary: 'Register a new user' }),
    responses: (): MethodDecorator[] => [
      ApiResponse({
        status: 201,
        description: 'User registered successfully',
        type: AuthResponseSchema,
        example: {
          user: {
            id: 'ce6c76ee-8586-4050-87b2-eb8efa997a47',
            email: 'user@example.com',
            username: 'johndoe',
            createdAt: '2025-10-04T17:02:45.549Z',
            updatedAt: '2025-10-04T17:02:45.549Z',
          },
          accessToken: 'eyJhbGciOi...',
          refreshToken: 'eyJhbGciOi...',
        },
      }),
      ApiResponse({ status: 400, description: 'Invalid input data' }),
      ApiResponse({
        status: 401,
        description: 'Registration failed - user already exists',
      }),
    ],
  },

  login: {
    operation: (): MethodDecorator => ApiOperation({ summary: 'Login user' }),
    responses: (): MethodDecorator[] => [
      ApiResponse({
        status: 200,
        description: 'Login successful',
        type: AuthResponseSchema,
        example: {
          user: {
            id: 'ce6c76ee-8586-4050-87b2-eb8efa997a47',
            email: 'user@example.com',
            username: 'johndoe',
            createdAt: '2025-10-04T17:02:45.549Z',
            updatedAt: '2025-10-04T17:02:45.549Z',
          },
          accessToken: 'eyJhbGciOi...',
          refreshToken: 'eyJhbGciOi...',
        },
      }),
      ApiResponse({ status: 400, description: 'Invalid input data' }),
      ApiResponse({ status: 401, description: 'Invalid credentials' }),
    ],
  },

  refresh: {
    operation: (): MethodDecorator =>
      ApiOperation({ summary: 'Refresh access token' }),
    responses: (): MethodDecorator[] => [
      ApiResponse({
        status: 200,
        description: 'Token refreshed successfully',
        type: AuthResponseSchema,
        example: {
          user: {
            id: 'ce6c76ee-8586-4050-87b2-eb8efa997a47',
            email: 'user@example.com',
            username: 'johndoe',
            createdAt: '2025-10-04T17:02:45.549Z',
            updatedAt: '2025-10-04T17:02:45.549Z',
          },
          accessToken: 'eyJhbGciOi...',
          refreshToken: 'eyJhbGciOi...',
        },
      }),
      ApiResponse({ status: 401, description: 'Invalid refresh token' }),
    ],
  },
}
