import { PersonalInformation, User } from '../user/entities';
import { PersonalInformationService, UserService } from '../user/service';

import { Ingredient } from './entities';
import { IngredientController } from './controller';
import { IngredientService } from './service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, User, PersonalInformation])],
  controllers: [IngredientController],
  providers: [IngredientService, UserService, PersonalInformationService],
})
export class IngredientModule {}
