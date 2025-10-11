export interface User {
  id: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  email: string
  username: string
  password: string
}

export interface LoginUserData {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface JwtPayload {
  sub: string
  email: string
  type?: string
  iat?: number
  exp?: number
}
