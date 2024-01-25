import { UsersService } from './../users/users.service';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
