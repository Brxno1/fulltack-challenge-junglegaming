import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { OutboxEventStatus } from '@/types/outbox'
import { type TaskEvent } from '@/types/task-events'

@Entity('outbox_events')
@Index(['status', 'createdAt'])
export class OutboxEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column({ type: 'uuid' })
  aggregateId: string

  @Column({
    type: 'varchar',
  })
  type: string

  @Column({ type: 'jsonb' })
  data: TaskEvent

  @Index()
  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status: OutboxEventStatus

  @Column({ type: 'int', default: 0 })
  retryCount: number

  @Column({ type: 'text', nullable: true })
  errorMessage: string | null

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt: Date | null
}
