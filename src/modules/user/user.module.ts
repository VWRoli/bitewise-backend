import { PersonalInformation, User } from './entities';
import { PersonalInformationService, UserService } from './service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, PersonalInformation])],
  controllers: [UserController],
  providers: [UserService, PersonalInformationService],
})
export class UserModule {}
