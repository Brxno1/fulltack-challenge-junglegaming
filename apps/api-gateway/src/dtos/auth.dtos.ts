import type { CreateUserData, LoginUserData } from '@jungle/types'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class RegisterUserDto implements CreateUserData {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(3)
  username: string

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string
}

export class LoginUserDto implements LoginUserData {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
