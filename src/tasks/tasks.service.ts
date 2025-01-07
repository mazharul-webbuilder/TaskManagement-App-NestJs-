import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateTaskStatus(status: string, id: string): Task {
    const task = this.getTaskById(id);

    task.status = TaskStatus.IN_PROGRESS;

    return task;
  }

  deleteTask(id: string): boolean {
    const isFound: boolean | Task = this.getTaskById(id);

    if (isFound) {
      this.tasks = this.tasks.filter((item) => item.id !== id);
      return true
    }
    return false;
  }
}
