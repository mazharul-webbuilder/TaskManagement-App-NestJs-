import { IsInt, IsOptional, Min } from 'class-validator';

export class TaskPaginatorDto {
  @IsOptional()
  page: number = 1;

  @IsOptional()
  limit: number = 5;
}
