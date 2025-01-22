import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();
    if (!this.issStatusValid(value)) {
      throw new BadRequestException(`Invalid task status: ${value}`);
    }
    return value;
  }

  private issStatusValid(status: any): boolean {
    const idx = this.allowedStatus.indexOf(status);

    return idx !== -1;
  }
}
