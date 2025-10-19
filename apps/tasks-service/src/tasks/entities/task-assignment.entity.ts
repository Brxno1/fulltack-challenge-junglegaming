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
@Unique(['task', 'actor'])
export class TaskAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index('IDX_task_assignments_task')
  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task

  @Index('IDX_task_assignments_taskId')
  @Column({ type: 'varchar' })
  taskId: string

  @Index('IDX_task_assignments_actor')
  @Column({ type: 'varchar' })
  actor: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
