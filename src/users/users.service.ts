import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  createUser(user: CreateUserDto): Promise<CreateUserDto> {
    const randomString = randomBytes(2).toString('hex').toUpperCase();

    const newUser = this.userRepository.create({
      ...user,
      username: user.username ?? `user_name_${randomString}`,
      password: user.password ?? 'password',
    });
    return this.userRepository.save(newUser);
  }
}
