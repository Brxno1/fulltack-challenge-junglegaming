import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class RegisterUserDto {
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

export class LoginUserDto {
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
