import { RefreshTokenBlacklist } from '../entities/refresh-token-blacklist.entity'

export abstract class RefreshTokenBlacklistRepository {
  abstract save(tokenHash: string, expiresAt: Date): Promise<void>
  abstract findByHash(tokenHash: string): Promise<RefreshTokenBlacklist | null>
  abstract deleteExpired(): Promise<void>
}
