import { ApiProperty } from '@nestjs/swagger';

export class UserResponseSchema {
  @ApiProperty({ example: 'ce6c76ee-8586-4050-87b2-eb8efa997a47' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: '2025-10-04T17:02:45.549Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-04T17:02:45.549Z' })
  updatedAt: Date;
}

export class AuthResponseSchema {
  @ApiProperty({ type: UserResponseSchema })
  user: UserResponseSchema;

  @ApiProperty({
    example: 'eyJhbGciOi...',
    description: 'JWT access token (expires in 15 minutes)'
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOi...',
    description: 'JWT refresh token (expires in 7 days)'
  })
  refreshToken: string;
}

export class ErrorResponseSchema {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Invalid input data' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
