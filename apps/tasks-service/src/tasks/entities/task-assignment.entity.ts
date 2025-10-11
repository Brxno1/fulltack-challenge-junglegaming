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
@Unique(['task', 'userId'])
export class TaskAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task

  @Index()
  @Column({ type: 'varchar' })
  taskId: string

  @Index()
  @Column({ type: 'varchar' })
  userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
