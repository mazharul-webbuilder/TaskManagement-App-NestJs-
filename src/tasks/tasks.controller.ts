import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Patch('/update/:id/status')
  updateTaskStatus(
    @Body('status') status: string,
    @Param('id') id: string,
  ): Task {
    return this.taskService.updateTaskStatus(status, id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): { message: string } {
    if (this.taskService.deleteTask(id)) {
      return {
        message: 'Task Deleted Successfully',
      };
    } else {
      return {
        message: 'Something went wrong'
      }
    }
  }
}
