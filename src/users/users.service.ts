import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async createUser(user: UserDto) {
    const userFound = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (userFound)
      return new HttpException(
        'Pesao, que ya existe el usuario',
        HttpStatus.CONFLICT,
      );

    const newUser = this.userRepository.create(user);
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
  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound)
      return new HttpException(
        'Pesao, que no existe el usuario. Busca bien!!',
        HttpStatus.NOT_FOUND,
      );

    return userFound;
  }

  // delete user by id
  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  // update user by id
  updateUser(id: number, user: UserUpdateDto) {
    return this.userRepository.update(id, user);
  }
}
