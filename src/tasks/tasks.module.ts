import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthModule } from "../auth/auth.module";
import { LoggerMiddleware } from "../middleware/logger-middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  exports: [TaskRepository],
})
export class TasksModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('tasks');  // Apply to routes under '/tasks'
  }
}
