import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getFilteredTasks(filterDto: GetTasksFilterDto): Task[]{
  //   const {status, search} = filterDto
  //
  //   let tasks = this.getAllTasks()
  //
  //   if (status){
  //     tasks = tasks.filter(task => task.status === status)
  //   }
  //   if (search){
  //     tasks = tasks.filter(task =>
  //       task.title.includes(search) || task.description.includes(search))
  //   }
  //
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found: Task = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  //
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task:Task = this.getTaskById(id);
  //
  //   task.status = status;
  //
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   const found: Task = this.getTaskById(id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with id ${id} not found`);
  //   }
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
