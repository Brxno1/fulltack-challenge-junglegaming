import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { TaskPriority, TaskStatus } from '../constants/task.enums'

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column({ type: 'text', nullable: true })
  description?: string | null

  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date | null

  @Column({ type: 'varchar', length: 16 })
  priority!: TaskPriority

  @Column({ type: 'varchar', length: 16 })
  status!: TaskStatus

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
