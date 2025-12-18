import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  //   @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  //   @Type(() => Number) // 类型转换
  offset: number;
}
