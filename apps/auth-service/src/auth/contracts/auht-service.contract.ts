import type { AuthResponse, CreateUserData, LoginUserData } from '@jungle/types'

export abstract class AuthServiceContract {
  abstract register(user: CreateUserData): Promise<AuthResponse>
  abstract login(user: LoginUserData): Promise<AuthResponse>
  abstract refresh(refreshToken: string): Promise<AuthResponse>
}
