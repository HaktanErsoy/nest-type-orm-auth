import { Task } from '@/tasks/entities/task.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto extends PartialType(Task) {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
