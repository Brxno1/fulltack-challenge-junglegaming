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

  @Index()
  @Column({ type: 'uuid' })
  createdBy: string

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string | null

  @Index()
  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date | null

  @Index()
  @Column({ type: 'varchar', length: 16 })
  priority: TaskPriority

  @Index()
  @Column({ type: 'varchar', length: 16 })
  status: TaskStatus

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date | null
}
