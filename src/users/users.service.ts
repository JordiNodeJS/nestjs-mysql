import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async createUser(user: CreateUserDto) {
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

  // get user by username
  async getUserByUsername(username: string) {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    if (!userFound)
      return new HttpException(
        'El usuario que has escrito no concuerda con ninguno que tengamos registrado en la base de datos. Mira de escribirlo bien si piensas que sí existe.',
        HttpStatus.NOT_FOUND,
      );

    return userFound;
  }

  // delete user by id
  async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0)
      return new HttpException(
        'No se ha encontrado el usuario que quieres borrar.',
        HttpStatus.NOT_FOUND,
      );

    return result;
  }

  // update user by id
  async updateUser(id: number, user: UserUpdateDto) {
    const userFound = await this.userRepository.findOne({
      where: { id },
    });

    if (!userFound)
      return new HttpException(
        'No se ha encontrado el usuario que quieres actualizar.',
        HttpStatus.NOT_FOUND,
      );

    const updatedUser = await this.userRepository.update(id, user);
    return updatedUser;
  }
}
