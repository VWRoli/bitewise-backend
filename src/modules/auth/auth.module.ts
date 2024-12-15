import { FacebookStrategy, GoogleStrategy, JwtStrategy } from './strategy';
import { PersonalInformation, User } from '../user/entities';
import { PersonalInformationService, UserService } from '../user/service';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './services';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TokenService } from '../token/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import facebookOauthConfig from './config/facebook-oauth.config';
import googleOauthConfig from './config/google-oauth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PersonalInformation]),
    JwtModule.register({}),
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forFeature(facebookOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    TokenService,
    GoogleStrategy,
    FacebookStrategy,
    PersonalInformationService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
