import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";

/*
Entity  is similar to Laravel Eloquent Model class.
It marks the class as a database entity and maps it to a specific table in the database.
*/

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, {
    eager: false, // only one side of the relationship can be eager
  })
  user: User;
}
