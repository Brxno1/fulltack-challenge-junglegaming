import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'

import { RefreshTokenBlacklistRepository } from '@/auth/repositories/refresh-token-blacklist'

@Injectable()
export class RefreshTokenBlacklistService {
  constructor(
    private readonly blacklistRepository: RefreshTokenBlacklistRepository,
  ) {}

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex')
  }

  async addToBlacklist(token: string, expiresAt: Date): Promise<void> {
    const tokenHash = this.hashToken(token)
    await this.blacklistRepository.save(tokenHash, expiresAt)
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const tokenHash = this.hashToken(token)
    const blacklisted = await this.blacklistRepository.findByHash(tokenHash)
    return !!blacklisted
  }

  async cleanExpiredTokens(): Promise<void> {
    await this.blacklistRepository.deleteExpired()
  }
}
