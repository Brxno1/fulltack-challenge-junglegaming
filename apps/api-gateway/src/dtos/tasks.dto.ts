import { TaskPriority, TaskStatus } from '@jungle/types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { IsNotPastDate } from '@/validators/tasks-deadline.validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Implement user authentication',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Add JWT authentication to the API',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiProperty({
    description: 'Task deadline (cannot be in the past)',
    example: '2025-12-31T23:59:59.000Z',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNotPastDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  deadline: Date | null;

  @ApiProperty({
    description: 'Task priority',
    enum: TaskPriority,
    example: TaskPriority.HIGH,
  })
  @IsEnum(TaskPriority)
  @Transform(({ value }) => value.toUpperCase())
  priority: TaskPriority;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.TODO,
  })
  @IsEnum(TaskStatus)
  @Transform(({ value }) => value.toUpperCase())
  status: TaskStatus;
}

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Implement user authentication',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Add JWT authentication to the API',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  description: string | null;

  @ApiProperty({
    description: 'Task deadline (cannot be in the past)',
    example: '2025-12-31T23:59:59.000Z',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNotPastDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  deadline: Date | null;

  @ApiProperty({
    description: 'Task priority',
    enum: TaskPriority,
    example: TaskPriority.HIGH,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  @Transform(({ value }) => value.toUpperCase())
  priority: TaskPriority;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  @Transform(({ value }) => value.toUpperCase())
  status: TaskStatus;
}

export class ListTasksQueryDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number(value))
  size: number;
}

// Response DTOs
export class TaskResponseDto {
  @ApiProperty({
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Implement user authentication',
  })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Add JWT authentication to the API',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Task deadline',
    example: '2025-12-31T23:59:59.000Z',
    nullable: true,
  })
  deadline: Date | null;

  @ApiProperty({
    description: 'Task priority',
    enum: TaskPriority,
    example: TaskPriority.HIGH,
  })
  priority: TaskPriority;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'User ID who created the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  author: string;

  @ApiProperty({
    description: 'Task creation timestamp',
    example: '2025-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Task last update timestamp',
    example: '2025-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class CreateTaskResponseDto {
  @ApiProperty({
    description: 'Created task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class PaginatedTasksResponseDto {
  @ApiProperty({
    description: 'List of tasks',
    type: [TaskResponseDto],
  })
  tasks: TaskResponseDto[];

  @ApiProperty({
    description: 'Total number of tasks',
    example: 25,
  })
  total: number;
}
