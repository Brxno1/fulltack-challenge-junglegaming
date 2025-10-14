import { AuthResponse, CreateUserData, LoginUserData } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import { AuthServiceContract } from '@/contracts/auth.service.contract'
import { ProxyServiceContract } from '@/contracts/proxy.service.contract'

import {
  AUTH_ENDPOINT,
  AUTH_SERVICE_NAME,
} from '../constants/gateway-auth.constants'

@Injectable()
export class AuthService implements AuthServiceContract {
  constructor(private readonly proxyService: ProxyServiceContract) {}

  async register(registerData: CreateUserData): Promise<AuthResponse> {
    return this.proxyAuthRequest(AUTH_ENDPOINT.REGISTER, registerData)
  }

  async login(loginData: LoginUserData): Promise<AuthResponse> {
    return this.proxyAuthRequest(AUTH_ENDPOINT.LOGIN, loginData)
  }

  async refreshTokens(refreshToken: string): Promise<AuthResponse> {
    return this.proxyAuthRequest(AUTH_ENDPOINT.REFRESH, refreshToken)
  }

  private async proxyAuthRequest(
    endpoint: string,
    data: unknown,
  ): Promise<AuthResponse> {
    const response = await this.proxyService.forwardRequest<AuthResponse>({
      serviceName: AUTH_SERVICE_NAME,
      method: 'POST',
      path: endpoint,
      data,
    })

    return response.data
  }
}
