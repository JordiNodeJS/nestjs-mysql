import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './user.entity';
import { UserDto } from './dto/user.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  createUser(user: UserDto): Promise<UserDto> {
    const randomString = randomBytes(2).toString('hex').toUpperCase();

    const newUser = this.userRepository.create({
      ...user,
      username: user.username ?? `user_name_${randomString}`,
      password: user.password ?? 'password',
    });
    return this.userRepository.save(newUser);
  }

  // getUsers(): Promise<Users[]> {
  //   return this.userRepository.find();
  // }

  // get all users
  getUsers() {
    return this.userRepository.find();
  }

  // get user by id
  getUser(id: number) {
    console.log('service id 👉', id, typeof id);
    return this.userRepository.findOne({
      where: { id },
    });
  }
}
