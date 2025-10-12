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
@Index('IDX_task_audit_log_task_createdAt', ['task', 'createdAt'])
export class TaskAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index('IDX_task_audit_log_task')
  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task

  @Index('IDX_task_audit_log_taskId')
  @Column({ type: 'uuid' })
  taskId: string

  @Index('IDX_task_audit_log_userId')
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

  @Index('IDX_task_audit_log_createdAt')
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
