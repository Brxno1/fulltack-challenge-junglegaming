import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { TaskPriority, TaskStatus } from '../constants/task.enums'

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index('IDX_tasks_actor')
  @Column({ type: 'uuid' })
  actor: string

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string | null

  @Index('IDX_tasks_deadline')
  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date | null

  @Index('IDX_tasks_priority')
  @Column({ type: 'varchar', length: 16 })
  priority: TaskPriority

  @Index('IDX_tasks_status')
  @Column({ type: 'varchar', length: 16 })
  status: TaskStatus

  @Index('IDX_tasks_createdAt')
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null
}
