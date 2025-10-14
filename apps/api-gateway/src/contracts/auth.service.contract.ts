import { AuthResponse, CreateUserData, LoginUserData } from '@jungle/types'

export abstract class AuthServiceContract {
  abstract register(user: CreateUserData): Promise<AuthResponse>
  abstract login(user: LoginUserData): Promise<AuthResponse>
  abstract refreshTokens(refreshToken: string): Promise<AuthResponse>
}
