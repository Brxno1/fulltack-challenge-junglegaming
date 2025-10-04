import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    format: 'email',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    example: 'johndoe',
    description: 'Username (min 3 characters)',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  username!: string

  @ApiProperty({
    example: 'password123',
    description: 'Password (min 6 characters)',
    minLength: 6,
    format: 'password',
  })
  @IsString()
  @MinLength(6)
  password!: string
}

export class LoginUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    format: 'email',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    format: 'password',
  })
  @IsString()
  @MinLength(6)
  password!: string
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIU...',
    description: 'JWT refresh token (valid for 7 days)',
    format: 'jwt',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string
}
