import { Transform } from 'class-transformer'
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator'

import {
  TASK_COMMENT_MESSAGES,
  TASK_COMMENT_VALIDATION,
} from '@/tasks/constants/tasks.constants'

export class CreateTaskCommentDto {
  @IsString({ message: TASK_COMMENT_MESSAGES.CONTENT_REQUIRED })
  @IsNotEmpty({ message: TASK_COMMENT_MESSAGES.CONTENT_REQUIRED })
  @Length(
    TASK_COMMENT_VALIDATION.CONTENT_MIN_LENGTH,
    TASK_COMMENT_VALIDATION.CONTENT_MAX_LENGTH,
    {
      message: TASK_COMMENT_MESSAGES.CONTENT_TOO_LONG,
    },
  )
  content: string
}

export class TaskIdParamDto {
  @IsUUID('4', { message: TASK_COMMENT_MESSAGES.INVALID_TASK_ID })
  taskId: string
}

export class ListTaskCommentsQueryDto {
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
