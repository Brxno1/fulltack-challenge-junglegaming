import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { AUTH_ERROR_MESSAGES } from '@/auth/constants/error-messages'
import { RefreshTokenBlacklistService } from '@/auth/services/refresh-token-blacklist.service'
import type { JwtPayload } from '@/infra/jwt/jwt.strategy'
import type { TokenPair } from '@/types/auth.types'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly blacklistService: RefreshTokenBlacklistService,
  ) {}

  async generate(userId: string, email: string): Promise<TokenPair> {
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN') || '15m',
      },
    )

    const refreshToken = await this.jwt.signAsync(
      { sub: userId, email, type: 'refresh' },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>('REFRESH_TOKEN_EXPIRES_IN') || '7d',
      },
    )

    return { accessToken, refreshToken }
  }

  async verifyRefresh(refreshToken: string): Promise<JwtPayload> {
    try {
      const isBlacklisted =
        await this.blacklistService.isBlacklisted(refreshToken)

      if (isBlacklisted) {
        throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_TOKEN)
      }

      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.config.get<string>('JWT_SECRET'),
      })

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_TOKEN)
      }

      return payload
    } catch {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_TOKEN)
    }
  }

  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await this.blacklistService.addToBlacklist(refreshToken, expiresAt)
  }
}
