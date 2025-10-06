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

import { TaskPriority, TaskStatus } from '@/tasks/constants/task.enums'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  deadline: string

  @IsEnum(TaskPriority)
  priority: TaskPriority

  @IsEnum(TaskStatus)
  status: TaskStatus
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  deadline: string

  @IsOptional()
  @IsEnum(TaskPriority)
  priority: TaskPriority

  @IsOptional()
  @IsEnum(TaskStatus)
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
