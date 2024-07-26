import { User } from '@/users/entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class SignInDto extends PartialType(User) {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
