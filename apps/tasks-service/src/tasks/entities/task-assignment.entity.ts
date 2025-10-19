import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

import { Task } from './tasks.entity'

@Entity('task_assignments')
@Unique(['task', 'author'])
export class TaskAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index('IDX_task_assignments_task')
  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task

  @Index('IDX_task_assignments_taskId')
  @Column({ type: 'varchar' })
  taskId: string

  @Index('IDX_task_assignments_author')
  @Column({ type: 'varchar' })
  author: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
