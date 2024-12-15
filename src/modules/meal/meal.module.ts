import { PersonalInformation, User } from '../user/entities';
import { PersonalInformationService, UserService } from '../user/service';

import { Ingredient } from '../ingredient/entities';
import { Meal } from './entities';
import { MealController } from './controller';
import { MealIngredient } from './entities';
import { MealService } from './service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Meal,
      User,
      MealIngredient,
      Ingredient,
      PersonalInformation,
    ]),
  ],
  controllers: [MealController],
  providers: [MealService, UserService, PersonalInformationService],
})
export class MealModule {}
