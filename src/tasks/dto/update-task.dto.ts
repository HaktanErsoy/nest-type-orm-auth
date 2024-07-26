import { CreateTaskDto } from '@/tasks/dto/create-task.dto';
import { TaskStatus } from '@/tasks/entities/task.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
