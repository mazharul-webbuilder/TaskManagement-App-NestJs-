import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title must be a string' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  @Length(10, 500, { message: 'Description must be between 10 and 500 characters' })
  description: string;
}
