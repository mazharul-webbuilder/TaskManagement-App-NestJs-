import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {
    super(taskRepo.target, taskRepo.manager, taskRepo.queryRunner);
  }
  
  
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const {status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', {status: status});
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`});
    }

    const tasks = await query.getMany();

    return tasks;
  }

  

  // This repository provides custom methods for interacting with the Task entity,
  // extending the base TypeORM Repository class and adding application-specific logic.
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
