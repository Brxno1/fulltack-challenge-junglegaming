import type { CreateUserData, LoginUserData } from '@jungle/types'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class RegisterUserDto implements CreateUserData {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Username',
    example: 'user123',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  username: string

  @ApiProperty({
    description: 'User password (min 8 chars, at least one uppercase)',
    example: 'MyP@ssword123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string
}

export class LoginUserDto implements LoginUserData {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'User password',
    example: 'MyP@ssword123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token to renew JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string

  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string

  @ApiProperty({
    description: 'Username',
    example: 'user123',
  })
  username: string
}
