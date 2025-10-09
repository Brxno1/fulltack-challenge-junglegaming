import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LessThan, Repository } from 'typeorm'

import { RefreshTokenBlacklist } from '@/auth/entities/refresh-token-blacklist.entity'
import { RefreshTokenBlacklistRepository } from '@/auth/repositories/refresh-token-blacklist'

@Injectable()
export class TypeormRefreshTokenBlacklistRepository
  implements RefreshTokenBlacklistRepository {
  constructor(
    @InjectRepository(RefreshTokenBlacklist)
    private readonly repository: Repository<RefreshTokenBlacklist>,
  ) { }

  async save(tokenHash: string, expiresAt: Date): Promise<void> {
    await this.repository.save({ tokenHash, expiresAt })
  }

  async findByHash(tokenHash: string): Promise<RefreshTokenBlacklist | null> {
    return this.repository.findOne({ where: { tokenHash } })
  }

  async deleteExpired(): Promise<void> {
    await this.repository.delete({
      expiresAt: LessThan(new Date()),
    })
  }
}
