import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";
import { TaskPaginatorDto } from "./task-paginator.dto";

export class GetTasksFilterDto extends TaskPaginatorDto{
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
  search: string;
}