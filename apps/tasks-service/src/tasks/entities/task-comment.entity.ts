import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Task } from '@/tasks/entities/tasks.entity'

@Entity('task_comments')
export class TaskComment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index('IDX_task_comments_taskId')
  @Column({ type: 'uuid' })
  taskId: string

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task

  @Index('IDX_task_comments_author')
  @Column({ type: 'uuid' })
  author: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  authorName: string

  @Column({ type: 'text' })
  content: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
