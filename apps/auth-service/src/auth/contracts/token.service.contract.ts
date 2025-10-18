import type { JwtPayload, TokenPair } from '@jungle/types'

export abstract class TokenServiceContract {
  abstract generate(userId: string, email: string): Promise<TokenPair>
  abstract verifyRefresh(refreshToken: string): Promise<JwtPayload>
  abstract invalidateRefreshToken(refreshToken: string): Promise<void>
}
