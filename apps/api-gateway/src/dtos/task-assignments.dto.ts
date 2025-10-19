import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

import { TASK_ASSIGNMENT_VALIDATION } from '@/constants/tasks.constants';

export class TaskIdParamDto {
  @ApiProperty({
    description: 'Task ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'Invalid task ID format' })
  taskId: string;
}

export class UserIdParamDto {
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID('4', { message: 'Invalid user ID format' })
  userId: string;
}

export class CreateTaskAssignmentDto {
  @ApiProperty({
    description: 'User ID to assign to the task',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsString({ message: 'User ID is required' })
  @IsUUID('4', { message: 'Invalid user ID format' })
  userId: string;
}

export class ListTaskAssignmentsQueryDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(TASK_ASSIGNMENT_VALIDATION.PAGE_MIN)
  @Transform(({ value }) => Number(value))
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Min(TASK_ASSIGNMENT_VALIDATION.SIZE_MIN)
  @Max(TASK_ASSIGNMENT_VALIDATION.SIZE_MAX)
  @Transform(({ value }) => Number(value))
  size?: number;
}

export class TaskAssignmentResponseDto {
  @ApiProperty({
    description: 'Assignment ID',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  id: string;

  @ApiProperty({
    description: 'Task ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  taskId: string;

  @ApiProperty({
    description: 'Assigned user ID',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId: string;

  @ApiProperty({
    description: 'Assignment creation date',
    example: '2025-10-19T18:00:00.000Z',
  })
  createdAt: Date;
}

export class CreateTaskAssignmentResponseDto {
  @ApiProperty({
    description: 'Created assignment ID',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  id: string;
}

export class PaginatedTaskAssignmentsResponseDto {
  @ApiProperty({
    description: 'List of task assignments',
    type: [TaskAssignmentResponseDto],
  })
  assignments: TaskAssignmentResponseDto[];

  @ApiProperty({
    description: 'Total number of assignments',
    example: 25,
  })
  total: number;
}
