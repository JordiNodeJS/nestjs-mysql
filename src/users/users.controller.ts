import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log('controler id 👉', id, typeof id);
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: UserDto) {
    return this.userService.createUser(newUser);
  }
}
