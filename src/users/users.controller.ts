import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() newUser: UserDto) {
    return this.userService.createUser(newUser);
  }
}
