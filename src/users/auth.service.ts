import { SignInDto } from '@/users/dto/sign-in.dto';
import { SignUpDto } from '@/users/dto/sign-up.dto';
import { UsersService } from '@/users/users.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private saltRounds = 10;

  async signin(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(signInDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password/Email is wrong');
    }

    const token = await this.jwtService.signAsync(signInDto);

    return { access_token: token };
  }

  async signup(signUpDto: SignUpDto) {
    const [existingUser] = await this.usersService.find(signUpDto.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPw = await bcrypt.hash(signUpDto.password, this.saltRounds);

    return await this.usersService.create({
      email: signUpDto.email,
      password: hashedPw,
    });
  }
}
