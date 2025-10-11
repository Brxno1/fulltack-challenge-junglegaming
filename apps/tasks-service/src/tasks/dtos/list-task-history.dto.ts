import { Transform } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class ListTaskHistoryQueryDto {
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
