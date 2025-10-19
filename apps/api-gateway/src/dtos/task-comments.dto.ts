import {
  TASK_COMMENT_MESSAGES,
  TASK_COMMENT_VALIDATION,
} from '@jungle/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateTaskCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'This is a comment about the task',
    minLength: 1,
    maxLength: 2000,
  })
  @IsString({ message: TASK_COMMENT_MESSAGES.CONTENT_REQUIRED })
  @IsNotEmpty({ message: TASK_COMMENT_MESSAGES.CONTENT_REQUIRED })
  @Length(
    TASK_COMMENT_VALIDATION.CONTENT_MIN_LENGTH,
    TASK_COMMENT_VALIDATION.CONTENT_MAX_LENGTH,
    {
      message: TASK_COMMENT_MESSAGES.CONTENT_TOO_LONG,
    }
  )
  content: string;
}

export class TaskIdParamDto {
  @ApiProperty({
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: TASK_COMMENT_MESSAGES.INVALID_TASK_ID })
  taskId: string;
}

export class ListTaskCommentsQueryDto {
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
    description: 'Number of comments per page',
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
export class TaskCommentResponseDto {
  @ApiProperty({
    description: 'Comment unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Task unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  taskId: string;

  @ApiProperty({
    description: 'User ID who created the comment',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  actor: string;

  @ApiProperty({
    description: 'Comment content',
    example: 'This is a comment about the task',
  })
  content: string;

  @ApiProperty({
    description: 'Comment creation timestamp',
    example: '2025-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Comment last update timestamp',
    example: '2025-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class CreateTaskCommentResponseDto {
  @ApiProperty({
    description: 'Created comment unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class PaginatedTaskCommentsResponseDto {
  @ApiProperty({
    description: 'List of comments',
    type: [TaskCommentResponseDto],
  })
  comments: TaskCommentResponseDto[];

  @ApiProperty({
    description: 'Total number of comments',
    example: 25,
  })
  total: number;
}
