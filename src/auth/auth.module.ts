import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { LocalStrategy } from './strategies/local-strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Profile } from '../users/entities/profile.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: `${jwtConstants.secret}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
