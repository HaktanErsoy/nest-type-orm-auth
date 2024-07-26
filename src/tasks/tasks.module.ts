import { Task } from '@/tasks/entities/task.entity';
import { TasksController } from '@/tasks/tasks.controller';
import { TasksService } from '@/tasks/tasks.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
