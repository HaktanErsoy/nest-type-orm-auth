import { CreateTaskDto } from '@/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@/tasks/dto/update-task.dto';
import { Task, TaskStatus } from '@/tasks/entities/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return this.tasksRepository.save(task);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    task.status = updateTaskDto.status;
    return this.tasksRepository.save(task);
  }

  async remove(id: string) {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
