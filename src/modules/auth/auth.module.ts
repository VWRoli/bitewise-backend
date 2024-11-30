import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy, JwtStrategy } from './strategy';
import { AuthService } from './services';
import { UserService } from '../user/service';
import { TokenService } from '../token/services';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from './config/google-oauth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    TokenService,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
