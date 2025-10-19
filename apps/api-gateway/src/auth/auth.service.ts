import type {
  AuthResponse,
  CreateUserData,
  LoginUserData,
} from '@jungle/types';
import { Injectable } from '@nestjs/common';

import { AuthServiceContract } from '@/contracts/auth.service.contract';
import { ProxyServiceContract } from '@/contracts/proxy.service.contract';
import { AuthErrorMapper } from '@/mappers/auth-error.mapper';

import { AUTH_ENDPOINT, AUTH_SERVICE_NAME } from '../constants/auth.constants';

@Injectable()
export class AuthService implements AuthServiceContract {
  constructor(private readonly proxyService: ProxyServiceContract) {}

  async register(registerData: CreateUserData): Promise<AuthResponse> {
    return this.proxyAuthRequest<CreateUserData>(
      AUTH_ENDPOINT.REGISTER,
      registerData
    );
  }

  async login(loginData: LoginUserData): Promise<AuthResponse> {
    return this.proxyAuthRequest<LoginUserData>(AUTH_ENDPOINT.LOGIN, loginData);
  }

  async refreshTokens(refreshToken: string): Promise<AuthResponse> {
    return this.proxyAuthRequest<{ refreshToken: string }>(
      AUTH_ENDPOINT.REFRESH,
      { refreshToken }
    );
  }

  private async proxyAuthRequest<TData>(
    endpoint: string,
    body: TData
  ): Promise<AuthResponse> {
    const response = await this.proxyService.forwardRequest<AuthResponse>({
      serviceName: AUTH_SERVICE_NAME,
      method: 'POST',
      path: endpoint,
      data: body,
    });

    if (response.error) {
      const errorData = response.data as unknown as {
        error: string;
        message: string;
      };
      throw new AuthErrorMapper({
        code: errorData.error,
        message: errorData.message,
        status: response.status,
      });
    }

    return response.data as AuthResponse;
  }
}
