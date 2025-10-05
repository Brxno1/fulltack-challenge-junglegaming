import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

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
    example: 'Password123',
    description: 'Password (min 8 chars, at least one uppercase letter)',
    minLength: 8,
    format: 'password',
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
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
    example: 'Password123',
    description: 'User password',
    format: 'password',
  })
  @IsString()
  @MinLength(8)
  password!: string
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'Your-refresh-token-here',
    description: 'JWT refresh token (valid for 7 days)',
    format: 'jwt',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string
}
