import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/user-update.dto';

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

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  // update user by id
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
