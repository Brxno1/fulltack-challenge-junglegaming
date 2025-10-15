import { AuthResponse, CreateUserData, LoginUserData } from '@jungle/types'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthServiceContract } from '@/contracts/auth.service.contract'
import { ProxyServiceContract } from '@/contracts/proxy.service.contract'

import { AUTH_ENDPOINT, AUTH_SERVICE_NAME } from '../constants/auth.constants'

@Injectable()
export class AuthService implements AuthServiceContract {
  constructor(private readonly proxyService: ProxyServiceContract) {}

  async register(registerData: CreateUserData): Promise<AuthResponse> {
    return this.proxyAuthRequest<CreateUserData>(
      AUTH_ENDPOINT.REGISTER,
      registerData,
    )
  }

  async login(loginData: LoginUserData): Promise<AuthResponse> {
    return this.proxyAuthRequest<LoginUserData>(AUTH_ENDPOINT.LOGIN, loginData)
  }

  async refreshTokens(refreshToken: string): Promise<AuthResponse> {
    return this.proxyAuthRequest<string>(AUTH_ENDPOINT.REFRESH, refreshToken)
  }

  private async proxyAuthRequest<TData>(
    endpoint: string,
    data: TData,
  ): Promise<AuthResponse> {
    const response = await this.proxyService.forwardRequest<
      AuthResponse,
      TData
    >({
      serviceName: AUTH_SERVICE_NAME,
      method: 'POST',
      path: endpoint,
      data,
    })

    if (response.error) {
      throw new UnauthorizedException(response.error)
    }

    return response.data
  }
}
