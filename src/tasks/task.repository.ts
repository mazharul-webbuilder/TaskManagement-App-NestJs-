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


  async getTasks(filterDto: GetTasksFilterDto): Promise<{ tasks: Task[], total: number }> {
    const { status, search, page = 1, limit = 5 } = filterDto;

    const query = this.createQueryBuilder('task');

    // Apply status filter
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    // Apply search filter
    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    // Pagination: skip and take
    query.skip((page - 1) * limit);  // skip records for current page
    query.take(limit);  // take the number of records specified in limit

    // Get the tasks
    const tasks = await query.getMany();

    // Get total count of tasks (for pagination control on the frontend)
    const total = await query.getCount();

    return { tasks, total };
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
