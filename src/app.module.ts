import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersModule } from '@/users/users.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TasksModule } from './tasks/tasks.module';
import { Task } from '@/tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_project',
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
