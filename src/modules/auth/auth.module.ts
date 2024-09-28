import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { AuthService } from './services';
import { UserService } from '../user/service';
import { TokenService } from '../token/services';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, TokenService],
  exports: [AuthService],
})
export class AuthModule {}
