import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {
    super(taskRepo.target, taskRepo.manager, taskRepo.queryRunner);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.create({ title, description, status: TaskStatus.OPEN });
    await this.save(task);
    return task;
  }
}
