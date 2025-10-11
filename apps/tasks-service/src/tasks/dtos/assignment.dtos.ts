import { Transform } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

import { TASK_ASSIGNMENT_VALIDATION } from '../constants/assignment.constants'

export class ListTaskAssignmentsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(TASK_ASSIGNMENT_VALIDATION.PAGE_MIN)
  @Transform(({ value }) => Number(value))
  page?: number

  @IsOptional()
  @IsInt()
  @Min(TASK_ASSIGNMENT_VALIDATION.SIZE_MIN)
  @Max(TASK_ASSIGNMENT_VALIDATION.SIZE_MAX)
  @Transform(({ value }) => Number(value))
  size?: number
}
