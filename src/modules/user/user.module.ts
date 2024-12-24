import {
  NotificationSettings,
  PersonalInformation,
  SocialProfiles,
  User,
} from './entities';
import {
  NotificationSettingsService,
  PersonalInformationService,
  SocialProfilesService,
  UserService,
} from './service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      PersonalInformation,
      SocialProfiles,
      NotificationSettings,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PersonalInformationService,
    SocialProfilesService,
    NotificationSettingsService,
  ],
  exports: [
    UserService,
    PersonalInformationService,
    SocialProfilesService,
    NotificationSettingsService,
  ],
})
export class UserModule {}
