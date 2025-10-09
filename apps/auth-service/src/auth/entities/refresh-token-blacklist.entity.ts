import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('refresh_tokens_blacklist')
@Index(['expiresAt'])
export class RefreshTokenBlacklist {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  tokenHash: string

  @Column({ type: 'timestamptz' })
  expiresAt: Date
}
