import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Task } from './tasks.entity'

@Entity('task_comments')
@Index(['task', 'createdAt'])
export class TaskComment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task

  @Index()
  @Column({ type: 'uuid', nullable: true })
  userId: string | null

  @Column({ type: 'text' })
  content: string

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
