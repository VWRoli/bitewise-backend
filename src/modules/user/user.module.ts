import { PersonalInformation, SocialProfiles, User } from './entities';
import {
  PersonalInformationService,
  SocialProfilesService,
  UserService,
} from './service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PersonalInformation, SocialProfiles]),
  ],
  controllers: [UserController],
  providers: [UserService, PersonalInformationService, SocialProfilesService],
  exports: [UserService, PersonalInformationService, SocialProfilesService],
})
export class UserModule {}
