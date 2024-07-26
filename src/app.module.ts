import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersModule } from '@/users/users.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TasksModule } from './tasks/tasks.module';
import { Task } from '@/tasks/entities/task.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Task],

  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
