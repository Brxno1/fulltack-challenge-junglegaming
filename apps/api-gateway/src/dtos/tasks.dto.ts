import { TaskPriority, TaskStatus } from '@jungle/types'
import { Transform } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

import { IsNotPastDate } from '@/validators/tasks-deadline.validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  description: string | null

  @IsOptional()
  @IsNotPastDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  deadline: Date | null

  @IsEnum(TaskPriority)
  @Transform(({ value }) => value.toUpperCase())
  priority: TaskPriority

  @IsEnum(TaskStatus)
  @Transform(({ value }) => value.toUpperCase())
  status: TaskStatus
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  description: string | null

  @IsOptional()
  @IsNotPastDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  deadline: Date | null

  @IsOptional()
  @IsEnum(TaskPriority)
  @Transform(({ value }) => value.toUpperCase())
  priority: TaskPriority

  @IsOptional()
  @IsEnum(TaskStatus)
  @Transform(({ value }) => value.toUpperCase())
  status: TaskStatus
}

export class ListTasksQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number(value))
  size: number
}
