import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Task } from './tasks.entity'

@Entity('task_audit_log')
@Index(['task', 'createdAt'])
export class TaskAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task

  @Index()
  @Column({ type: 'uuid' })
  taskId: string

  @Index()
  @Column({ type: 'varchar' })
  userId: string

  @Column({ type: 'varchar', length: 64 })
  action: string

  @Column({ type: 'varchar', length: 64, nullable: true })
  field: string | null

  @Column({ type: 'jsonb', nullable: true })
  oldValue: unknown | null

  @Column({ type: 'jsonb', nullable: true })
  newValue: unknown | null

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
